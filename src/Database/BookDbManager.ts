import { Op, Model } from "sequelize";
import Book, { BookModel } from "./Models/Book";
import Errors from "../Errors/Errors";
import LocalBookType from "../Types/LocalBookType";
import sequelize from "./config";

class BookController {
  async addBook(book: LocalBookType) {
    try {
      const dbBook = await Book.create({ ...book });
      return dbBook;
    } catch (error) {
      return error;
    }
  }
  async addTofavorite(userId: string | number, bookISBN: string | number) {
    try {
      const dbRes = await sequelize.query(`
          INSERT INTO user_book (users_id,books_ISBN)
          values("${userId}","${bookISBN}");
          `);
      return dbRes;
    } catch (error) {
      return error;
    }
  }

  async getUserBooks(userId: string | number) {
    try {
      const books = await sequelize.query(`
        SELECT * FROM user_book,books
        WHERE users_id = ${userId};
        `);
      return books;
    } catch (error) {
      return error;
    }
  }
}

export default BookController;
