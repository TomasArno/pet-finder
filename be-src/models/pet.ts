import { sequelize, DataTypes } from "../database";

export const Pet = sequelize.define("pet", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imgURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lat: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  lng: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});
