import { User } from "../models";
import { UserConfig } from "../interfaces";

export class UserController {
  static async newUser(userData: UserConfig) {
    return await User.create({
      ...userData,
    });
  }

  static async findUser(userEmail: string) {
    return await User.findOne({
      where: { userEmail },
    });
  }

  static async getUser(userId: string) {
    return await User.findByPk(userId);
  }
}
