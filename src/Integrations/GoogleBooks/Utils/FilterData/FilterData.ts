import GoogleBookType from "../../../../Types/GoogleBookType";
import { getISBN } from "../CastBooktoLocal/CastBookToLocal";

export type FilterDataFunction = (books: GoogleBookType[]) => GoogleBookType[];
const filterData: FilterDataFunction = function (books) {
  if (books?.length > 1) {
    const filteredData = books.filter(
      (book) =>
        book.volumeInfo?.title &&
        book.volumeInfo?.description &&
        book.volumeInfo?.imageLinks?.thumbnail &&
        getISBN(book, 10)
    );
    return filteredData;
  } else return books;
};

export default filterData;
