import { Auth } from "../models";
import { AuthConfig } from "../interfaces";

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
    // agregar validacion x si meten misma contraseña
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
}
