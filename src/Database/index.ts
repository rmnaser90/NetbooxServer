import sequelize from "./config";
import User from "./Models/User";
import Book from "./Models/Book";

const inititializeSequelize = async ()=>{

  User.belongsToMany(Book, {
    through: "user_book",
    as: "books",
    foreignKey: "users_id",
  });
  
  Book.belongsToMany(User, {
    through: "user_book",
    as: "users",
    foreignKey: "books_ISBN",
  });
  
  await sequelize.sync({force:true}).catch((err) => {
    console.log(err);
  });
return sequelize
}
export default inititializeSequelize;
