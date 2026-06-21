import dotenv from "dotenv";

dotenv.config({ quiet: true });
export const ENV = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL,
  STREAM_API_SECRET: process.env.STREAM_API_SECRET,
  STREAM_API_KEY: process.env.STREAM_API_KEY,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,

};
