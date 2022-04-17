import sequelize from "./config";
import User from "./Models/User";
import Book from "./Models/Book";

User.belongsToMany(Book, {
  through: "user_book",
  as: "books",
  foreignKey: "users_id",
});

Book.belongsToMany(User, {
  through: "user_book",
  as: "users",
  foreignKey: "books_id",
});

sequelize.sync({force:true}).catch((err) => {
  console.log(err);
});

export default sequelize;
