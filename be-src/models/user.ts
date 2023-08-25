import { sequelize, DataTypes } from "../conn";

export const User = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
