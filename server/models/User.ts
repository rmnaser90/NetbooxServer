import { Sequelize, DataTypes, Model, BuildOptions } from "sequelize";
import sequelize from "./config";
import bcrypt from "bcryptjs";

export interface UserAttributes {
  id?: number;
  fullName?: string;
  email?: string;
  password?: string;
  isLoggedIn?: boolean;
  agreed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value: string) {
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(value, salt);
      this.setDataValue("password", hash);
    },
  },
  isLoggedIn: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  agreed: {
    type: DataTypes.BOOLEAN,
  },
  token: {
    type: DataTypes.STRING,
  },
});

export default User;