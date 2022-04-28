import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
export interface MessageModel extends Model {
  id: number;
  fullName?: string;
  email?: string;
  q?: string;
  message?: string;
  mondayItemId?: string;
}

export type MessageStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): MessageModel;
};

const messageInit = function (sequelize: Sequelize) {
  const Book = <MessageStatic>sequelize.define("messages", {
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
    },
    q: {
      type: DataTypes.STRING,
    },
    link: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.STRING(1000),
    },
    mondayId: {
      type: DataTypes.STRING,
      unique: true,
    },
    date: {
      type: DataTypes.DATE,
    },
  });
  return Book;
};
export default messageInit;
