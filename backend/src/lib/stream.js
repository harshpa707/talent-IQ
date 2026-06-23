import {  StreamChat } from "stream-chat";
import {StreamClient} from '@stream-io/node-sdk'
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("STREAM_API_KEY or STREAM_API_SECRET is missing");
}


export const chatClient = StreamChat.getInstance(apiKey, apiSecret); //chat 
export const streamClient = new StreamClient(apiKey,apiSecret); // video call

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUsers(userData);
    // return userData;
    console.log("Stream user upserted successfully:",userData)
  } catch (error) {
    console.error("Error Upserting Stream user:", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId);
    console.log("Stream user delete successfully:",userId);
  } catch (error) {
    console.error("Error deleting the  stream user:",error);
  }
};
