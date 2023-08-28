import { sequelize, DataTypes } from "../database";

export const Auth = sequelize.define("auth", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // user_id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
});
