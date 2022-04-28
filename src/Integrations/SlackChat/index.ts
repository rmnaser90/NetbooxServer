import axios from "axios";
import { ContactUsForm, SlackEvent } from "../../Types/Types";
import GoogleSearch from "../GoogleSearch";
import MondayBoard from "../MondayBoard";
import dotenv from "dotenv";

dotenv.config();
const googleSearch = new GoogleSearch();
const mondayBoard = new MondayBoard();

export default class SlackEvents {
  async eventHandler(event: SlackEvent) {
    if (event) {
      const { user, text } = event;
      const message = text?.split("<")[0];
      const result: string = await googleSearch.searchGoogle(message);

      const messageToSave: ContactUsForm = {
        fullName: user,
        message,
        q: message,
        email: user,
      };

      const link = result || "https://www.google.com";
      if (user && text) {
        const slackUrl = process.env.SLACK_URL || "";
        const replyRes = axios.post(slackUrl, {
          text:
            "Thanks for you're message, check this link for more info: " + link,
        });
        const modayRes = await mondayBoard.addItems(
          messageToSave,
          link,
          "Slack Message"
        );
      }
    }
  }
}
