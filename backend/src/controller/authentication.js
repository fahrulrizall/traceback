import UsersModel from "../models/users.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

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

    const accessToken = Jwt.sign(
      { uuid, username, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15s",
      }
    );

    const refreshToken = Jwt.sign(
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
  const { uuid } = req.params;

  try {
    const [data] = await UsersModel.readUser(uuid);

    res.json({
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({
      message: `uuid not exist`,
    });
  }
};

export default { login, logout };
