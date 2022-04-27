import sequelize from "./config";
import bookInit from "./Models/Book";
import userInit from "./Models/User";
import messageInit from "./Models/Messages";

export const User = userInit(sequelize);
export const Book = bookInit(sequelize);
export const Message = messageInit(sequelize)
User.belongsToMany(Book, {
  through: "user_book",
});

Book.belongsToMany(User, {
  through: "user_book",
});

interface Params{
  force:boolean
}
const inititializeSequelize:(force:Params)=>void = async (force) => {
  await sequelize.sync(force).catch((err) => {
    console.log(err);
  });

  return sequelize;
};
export default inititializeSequelize;
