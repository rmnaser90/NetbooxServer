import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { UserModel } from "./User";
export interface ReviewModel extends Model {
  readonly id?: number;
  text?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId?:number;
}

export type ReviewStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ReviewModel;
};
const reviewInit = function (sequelize: Sequelize) {
  const Review = <ReviewStatic>sequelize.define("reviews", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    text: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
  });
  return Review;
};
export default reviewInit;
