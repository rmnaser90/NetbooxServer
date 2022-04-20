import GoogleBookType from "../../../../Types/GoogleBookType";
import LocalBookType from "../../../../Types/LocalBookType";

export type CastBookTolocalFunction = (book: GoogleBookType) => LocalBookType;
export type GetISBNFunction = (book: GoogleBookType, version: number) => string;
export const getISBN: GetISBNFunction = (book, version) => {
  const isbn10 =
    book?.volumeInfo?.industryIdentifiers?.find((i) => i.type == `ISBN_${version}`)
      ?.identifier || "";
  return isbn10;
};

const castBookToLocal: CastBookTolocalFunction = function (
  book: GoogleBookType
) {
  const {
    id,
    volumeInfo: {
      title,
      subtitle,
      description,
      imageLinks,
      publishedDate,
      previewLink,
      categories,
      authors
    },
  } = book;
  const localBook: LocalBookType = {
    googleId: id,
    title,
    subtitle,
    text: description,
    img: imageLinks.thumbnail,
    publishedDate,
    previewLink,
    isbn10: getISBN(book, 10),
    isbn13: getISBN(book, 13),
    category:categories?categories[0]:"Unknown",
    author: authors?authors[0]:"Ananymous"
    
  };

  return localBook;
};
export default castBookToLocal;
