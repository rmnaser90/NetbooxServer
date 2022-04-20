import sequelize from "./config";
import bookInit from "./Models/Book";
import userInit from "./Models/User";

export const User = userInit(sequelize);
export const Book = bookInit(sequelize);

User.belongsToMany(Book, {
  through: "user_book",
});

Book.belongsToMany(User, {
  through: "user_book",
});

const test = async () => {
  const user = await User.findOne({
    where: {
      id: 1,
    },
  });
 if (user) {
   const books = await user.getBooks()
   console.log(books);
   
 }
};

const inititializeSequelize = async () => {
  await sequelize.sync().catch((err) => {
    console.log(err);
  });


  return sequelize;
};
export default inititializeSequelize;
