import axios, { AxiosRequestConfig } from "axios";
import { Params, BookQuery } from "../../Types/Types";
import castBookToLocal from "./Utils/CastBooktoLocal/CastBookToLocal";
import filterData from "./Utils/FilterData/FilterData";
import stringifyBookQuery from "./Utils/StringifyBookQuery/stringifyBookQuery";
import doten from 'dotenv'

doten.config()

class GoogleAPI {
  config: AxiosRequestConfig;
  constructor() {
    this.config = {
      baseURL: "https://www.googleapis.com/books/v1/",
      method: "GET",
      
    };
  }

  async getBooks(params: Params) {
    try {
      params.orderBy='newest'
      // params.key = process.env.GOOGLE_BOOKS_API_KEY 
      const res = await axios("/volumes", { ...this.config, params });
      const filteredData = filterData(res.data?.items);
      return filteredData.map(castBookToLocal);
    } catch (error) {
      console.log(JSON.stringify(error));

    }
  }

  async searchBooks(query: BookQuery) {
    try {
      const params: Params = {
        q: stringifyBookQuery(query),
        maxResults: 40,
      };
      const books = await this.getBooks(params);
      
      return books;
    } catch (error) {

      console.log(JSON.stringify(error));
      
    }
  }
}
export default GoogleAPI;
