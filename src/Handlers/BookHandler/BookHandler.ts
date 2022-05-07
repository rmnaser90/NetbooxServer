import { Book } from "../../Database/index";
import LocalBookType from "../../Types/LocalBookType";
import { UserModel } from "../../Database/Models/User";

class BookHandler {
  async addBook(book: LocalBookType) {
    try {
      const dbBook = await Book.upsert({ ...book });
      
      return dbBook;
    } catch (error) {
      return error;
    }
  }
  async addBulkBook(books: any[]) {
    try {
      const dbBooks = await Promise.all(
        books.map((book) => this.addBook(book))
      );
      return { msg: "done", books: dbBooks };
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
        return { message: "deleted", res };
      }
    } catch (error) {
      return error;
    }
  }
}

export default BookHandler;
