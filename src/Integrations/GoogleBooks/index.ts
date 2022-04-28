import axios, { AxiosRequestConfig } from "axios";
import {  Params, BookQuery,  } from "../../Types/Types";
import castBookToLocal from "./Utils/CastBooktoLocal/CastBookToLocal";
import filterData from "./Utils/FilterData/FilterData";
import stringifyBookQuery from "./Utils/StringifyBookQuery/stringifyBookQuery";

class GoogleAPI {
  config: AxiosRequestConfig;
  constructor() {
    this.config = {
      baseURL: "https://www.googleapis.com/books/v1/",
      method: "GET",
    };
  }
  
  async getBooks(params?: Params) {
    const res = await axios("/volumes", { ...this.config, params });
    const filteredData = filterData(res.data?.items);
    return filteredData.map(castBookToLocal);
  }

  async searchBooks(query: BookQuery) {
    const params: Params = {
      q: stringifyBookQuery(query),
      maxResults: 40,
    };
    const books = await this.getBooks(params);
    return books;
  }
}
export default GoogleAPI
