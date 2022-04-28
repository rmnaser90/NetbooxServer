import axios, { AxiosRequestConfig } from "axios";
import dotenv from "dotenv";
const env = dotenv.config();

export interface SearchParams {
  key?: string;
  cx?: string;
  q?: string;
  num?: number;
}

export interface GoogleRequestConfig extends AxiosRequestConfig {
  params?: SearchParams;
}

export default class GoogleSearch {
  config: GoogleRequestConfig;
  constructor() {
    this.config = {
      baseURL: "https://www.googleapis.com/customsearch/v1",
      params: {
        key: process.env.GOOGLE_API_KEY,
        cx: process.env.GOOGLE_ENGINE_ID,
        num: 5,
      },
    };
  }
  async searchGoogle(query: string) {
    try {
      const params: SearchParams = { ...this.config.params, q: query };
      const res = await axios({ ...this.config, params });
      return res.data?.items[0]?.formattedUrl || "https://www.google.com";
    } catch (error) {
      return error;
    }
  }
}
