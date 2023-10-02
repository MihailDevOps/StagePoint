import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_LOGIN) {
    throw new Error("Please define the MONGODB_LOGIN environment variable inside .env");
}
const config = {
    MONGODB_URI: process.env.MONGODB_LOGIN,
};

export default config;
