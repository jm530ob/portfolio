import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const config = {
  port: process.env.port || 5000,
  mongo_uri: process.env.mongo_uri || "localhost",
  database: process.env.database || "test",
  collection: process.env.collection || "default"
};


export default config;

