import { config } from "dotenv";
config()

export const dbConfig = {
    dev: process.env.NOD_ENV !== 'production',
    port: process.env.port
}

export const db = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    mongo_host: process.env.MONGO_DB_URI,
    mongo_name: process.env.MONGO_DB_NAME,
    cors: process.env.CORS,
    engine: process.env.DB_ENGINE_NAME
}
