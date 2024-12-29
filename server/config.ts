import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI || "localhost";
// export const DB_NAME = process.env.DB_NAME;

