export default interface LocalBookType {
  title?: string;
  subtitle?: string;
  text?: string;
  img?: string;
  publishDate?: string;
  previewLink?: string;
  isbn10?: string | number;
  isbn13?: string | number;
  googleId?: string | number;
  category?:string;
  author?:string
}
