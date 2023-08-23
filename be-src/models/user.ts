import { sequelize, DataTypes } from "../conn";

export const User = sequelize.define("user", {
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
