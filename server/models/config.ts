import { Sequelize } from "sequelize";

const sequelize = new Sequelize("netboox", "postgres", "", {
  dialect: "postgres",
  host: "localhost",
});


export default sequelize;
