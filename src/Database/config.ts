import { Sequelize } from "sequelize";

const username = process.env.SQL_USER || 'postgres'
const password = process.env.SQL_PASSWORD|| ''
const sequelize = new Sequelize("netboox",username , password, {
  dialect: "postgres",
  host: "localhost",
});

export default sequelize;



