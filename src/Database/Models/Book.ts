import { BuildOptions, DataTypes, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, Model, Sequelize } from "sequelize";
import { ReviewModel } from "./Review";
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
  addReview: HasManyAddAssociationMixin<ReviewModel,number>;
  getReviews:HasManyGetAssociationsMixin<ReviewModel>
}

export type BookStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): BookModel;
};
const bookInit =  function (sequelize:Sequelize) {
  
  const Book = <BookStatic>sequelize.define("books", {
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
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
 return Book 
}
  export default bookInit;
  