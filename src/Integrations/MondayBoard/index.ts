import axios, { AxiosRequestConfig } from "axios";
import dotenv from "dotenv";
import { Json } from "sequelize/types/utils";
import { Message } from "../../Database";
import { ContactUsForm } from "../../Types/Types";
dotenv.config();
const addZero = function (params:number) {
  return params<=9?'0':''
}

const getDate = function () {
  const date = new Date(Date.now());
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${addZero(month)}${month}-${addZero(day)}${day}`;
};
export default class MondayBoard {
  config: AxiosRequestConfig;
  constructor() {
    this.config = {
      method: "POST",
      baseURL: "https://api.monday.com/v2",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.MONDAY_API_TOKEN || "",
      },
    };
  }

  async getBoards() {
    try {
      const query = {
        query: `#graphql
        {
                    boards (ids: 2584856094) {
                      name
                      state
                      board_folder_id
                      items {
                        id
                        name
                        column_values {
                            id
                            title
                            value
                          }
                      }
                    }
                  }`,
      };
      const res = await axios({ ...this.config, data: query });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async addItems(
    contact: ContactUsForm,
    link: string,
    item_name: string = "Contact Us"
  ) {
    try {
      const { message, fullName, email, q } = contact;

      const variables = JSON.stringify({
        columnVals: JSON.stringify({
          message: { text: message },
          email2: email,
          fullname: { text: fullName },
          text8: q,
          link9: { text: q, url: link },
          status: { label: "Stuck" },
          date4: { date: getDate() },
        }),
      });

      const query = {
        query: `#graphql
          mutation ($columnVals: JSON!) {
               create_item ( board_id: 2584856094, 
               item_name:"${item_name}"
            column_values:$columnVals ) { id }}`,
        variables,
      };

      const { data } = await axios({ ...this.config, data: query });
      const mondayId = data.data?.create_item?.id;
      if (mondayId) {
        const dbMessage = await Message.create({
          ...contact,
          link,
          mondayId,
          date: getDate(),
        });
        return { data, dbMessage };
      }
      return { data };
    } catch (error) {
      console.log(error);
      
      return error;
    }
  }
}
