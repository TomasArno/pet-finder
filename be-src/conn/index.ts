import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(process.env.POSTGRES_CREDS);

try {
  sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export { DataTypes, sequelize };
