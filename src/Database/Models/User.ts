import {
  DataTypes,
  Model,
  BuildOptions,
  Sequelize,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyRemoveAssociationMixin,
} from "sequelize";
import bcrypt from "bcryptjs";
import { BookModel } from "./Book";
import { ReviewModel } from "./Review";

export interface UserModel extends Model {
  readonly id?: number;
  fullName?: string;
  email?: string;
  password?: string;
  isLoggedIn?: boolean;
  agreed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  books?: BookModel[];
  getBooks: HasManyGetAssociationsMixin<BookModel>;
  addBook: HasManyAddAssociationMixin<BookModel, number>;
  removeBook: HasManyRemoveAssociationMixin<BookModel, number>;
  addReview: HasManyAddAssociationMixin<ReviewModel, number>;
}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

const userInit = function (sequelize: Sequelize) {
  const User = <UserStatic>sequelize.define("users", {
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

  return User;
};
export default userInit;
