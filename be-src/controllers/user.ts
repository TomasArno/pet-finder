import { User } from "../models";

export class UserController {
  static async newUser(email: string) {
    return await User.create({
      email,
    });
  }

  static async getUser(id: number) {
    return await User.findOne({
      where: { id },
    });
  }

  static async getAll() {
    return await User.findAll();
  }

  // static async findUser(userId: string) {
  //   return await User.findByPk(userId);
  // }
}
