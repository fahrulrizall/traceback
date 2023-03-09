const UsersModel = require("../models/users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const [data] = await UsersModel.userNameExist(req.body.username);

    if (data.length === 0) {
      return res.status(400).json({
        message: `wrong email or password`,
      });
    }

    const isMatchPassword = await bcrypt.compare(
      req.body.password,
      data[0].password
    );

    if (!isMatchPassword) {
      return res.status(400).json({
        message: `wrong email or password`,
      });
    }

    const uuid = data[0].uuid;
    const username = data[0].username;
    const email = data[0].email;

    const accessToken = jwt.sign(
      { uuid, username, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15s",
      }
    );

    const refreshToken = jwt.sign(
      { uuid, username, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await UsersModel.updateRefreshToken(refreshToken, uuid);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // secure: true (jika menggunakan https)
    });

    res.json({
      accessToken,
    });
  } catch (error) {
    res.status(404).json({
      message: `wrong email or password`,
    });
  }
};

const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const [data] = await UsersModel.readRefreshToken(refreshToken);

  if (!data[0]) return res.sendStatus(204);
  const uuid = data[0].uuid;
  await UsersModel.updateRefreshToken(null, uuid);
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const [data] = await UsersModel.readRefreshToken(refreshToken);

    if (!data[0]) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decode) => {
        if (err) return res.sendStatus(403);

        const uuid = data[0].uuid;
        const username = data[0].username;
        const email = data[0].email;

        const accessToken = jwt.sign(
          { uuid, username, email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );

        res.json({
          accessToken,
        });
      }
    );
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports = { login, logout, refreshToken };
