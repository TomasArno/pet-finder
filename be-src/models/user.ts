import { sequelize, DataTypes } from "../conn";

export const User = sequelize.define("user", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
