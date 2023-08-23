import { User } from "../models";
import { UserConfig } from "../interfaces";

export class UserController {
  static async newUser(userData: UserConfig) {
    const { email, fullname } = userData;

    return await User.findOrCreate({
      where: { email },
      defaults: {
        email,
        fullname,
      },
    });
  }

  static async getUser(userId: string) {
    return await User.findByPk(userId);
  }
}
