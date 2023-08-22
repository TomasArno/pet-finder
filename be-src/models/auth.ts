import { sequelize, DataTypes } from "../conn";

export const Auth = sequelize.define("auth", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
