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

  // static async findAuth(userRecord) {
  //   return await Auth.findOne({
  //     where: { userId: userRecord.get("id") },
  //   });
  // }

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
