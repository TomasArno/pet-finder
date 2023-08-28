import { sequelize, DataTypes } from "../database";

export const User = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
