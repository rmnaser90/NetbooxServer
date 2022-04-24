import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../config";
export interface BookModel extends Model {
  title?: string;
  subtitle?: string;
  text?: string;
  img?: string;
  publishDate?: string;
  previewLink?: string;
  isbn10?: string | number;
  isbn13?: string | number;
  googleId?: string | number;
  category?: string;
  auther?: string;
}

export type BookStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): BookModel;
};
const bookInit =  function (sequelize:Sequelize) {
  
  const Book = sequelize.define<BookModel>("books", {
    googleId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    isbn10: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      unique: true,
    },
    isbn13: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    text: {
      type: DataTypes.STRING(5000),
      allowNull: true,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    publishDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    previewLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    auther: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
 return Book 
}
  export default bookInit;
  