import * as jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY_JWT;

export const verifyJwtToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    let data: jwt.JwtPayload | string;

    try {
      data = jwt.verify(token, SECRET_KEY);
    } catch {
      res.status(401).json({ error: "Invalid token" });
    }

    req._user = data;
    next();
  } else {
    res.status(401).json({ error: "No token provided" });
  }
};
