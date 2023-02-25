import jwt from "jsonwebtoken";
import usersModel from "../models/users.js";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookie.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const [data] = await usersModel.readRefreshToken(refreshToken);

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
            expiresIn: "15s",
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
