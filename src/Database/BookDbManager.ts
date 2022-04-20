import { Op, Model } from "sequelize";
import { BookModel } from "./Models/Book";
import { Book } from "./index";
import LocalBookType from "../Types/LocalBookType";
import sequelize from "./config";
import { UserModel } from "./Models/User";

class BookController {
  async addBook(book: LocalBookType) {
    try {
      const dbBook = await Book.create({ ...book });
      return dbBook;
    } catch (error) {
      return error;
    }
  }
  async addBulkBook(books: any[]) {
    try {
      books.forEach((book) => this.addBook(book));
      return { msg: "done" };
    } catch (error) {
      return error;
    }
  }
  async addToShelf(user: UserModel, bookISBN: string | number) {
    try {
      const book = await Book.findOne({
        where: {
          isbn10: bookISBN,
        },
      });
      if (book) {
        await user.addBook(book);
        return { message: "saved" };
      }
    } catch (error) {
      return error;
    }
  }

  async getUserBooks(user: UserModel) {
    try {
      const books = await user.getBooks();
      return books;
    } catch (error) {
      return error;
    }
  }

  async deleteUserBook(user: UserModel, bookISBN: string | number) {
    try {
      const book = await Book.findOne({
        where: {
          isbn10: bookISBN,
        },
      });
      if (book) {
        const res = await user.removeBook(book);
        return { message: "deleted",res };
      }
    } catch (error) {
      return error;
    }
  }
}

export default BookController;
