export interface Identifier {
  type: string;
  identifier: string;
}
export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}
export interface VolumeInfo {
  title: string;
  subtitle?: string;
  authors: string[];
  publishedDate: string;
  categories: string[];
  industryIdentifiers: Identifier[];
  pageCount: number;
  imageLinks: ImageLinks;
  previewLink: string;
  description:string
}

export default interface GoogleBookType {
  id: string;
  volumeInfo: VolumeInfo;
}
