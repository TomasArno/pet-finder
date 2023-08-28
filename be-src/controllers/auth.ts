import * as jwt from "jsonwebtoken";

import { Auth } from "../models";
import { AuthConfig } from "../interfaces";

const SECRET_KEY = process.env.SECRET_KEY_JWT;

export class AuthController {
  static async newAuth(authData) {
    const { email, password, userRecord } = authData;

    return await Auth.create({
      userId: userRecord.get("id"),
      email,
      password,
    });
  }

  // static async findAuth(userId: string) {
  //   return await Auth.findOne({
  //     where: { userId },
  //   });
  // }

  static async changeCredentials(
    credentials: {
      oldPassword: string;
      newPassword: string;
    },
    userId: string
  ) {
    // agregar validacion x si meten misma contraseña o si es distinta la oldPass
    const { newPassword, oldPassword } = credentials;
    return await Auth.update(
      { password: newPassword },
      {
        where: {
          userId,
          password: oldPassword,
        },
      }
    );
  }

  static async getAuth(authData: AuthConfig) {
    const { email, password } = authData;

    const auth = await Auth.findOne({
      where: { email, password },
    });

    return auth;
  }

  static async getAll() {
    return await Auth.findAll();
  }

  static createJwtToken(authRecord) {
    const token = jwt.sign({ id: authRecord.get("userId") }, SECRET_KEY);
    return token;
  }
}
