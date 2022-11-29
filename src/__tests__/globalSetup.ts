import dotenv from "dotenv";

const globalSetup = async () => {
  dotenv.config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
  });
};

module.exports = globalSetup;
