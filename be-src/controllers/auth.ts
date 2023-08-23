import { Auth } from "../models";
import { AuthConfig } from "../interfaces";

import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";

const SECRET_KEY = process.env.SECRET_KEY_JWT;

const getSHA256 = (input: string): string => {
  return crypto.createHash("sha256").update(input).digest("hex");
};

export class AuthController {
  static async newAuth(authData) {
    const { email, password, user } = authData;

    return await Auth.findOrCreate({
      where: { user_id: user.get("id") },
      defaults: {
        userId: user.get("id"),
        email,
        password: getSHA256(password),
      },
    });
  }

  static async getAuth(authData: AuthConfig) {
    const { email, password } = authData;

    const auth = await Auth.findOne({
      where: { email, password },
    });

    return auth;
  }

  static createToken(authRecord) {
    const token = jwt.sign({ id: authRecord.get("userId") }, SECRET_KEY);
    return token;
  }
}
