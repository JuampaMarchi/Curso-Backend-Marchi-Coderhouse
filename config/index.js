import { config } from "dotenv";
config()

export const dbconfig = {
    dev: process.env.NOD_ENV !== 'production',
    port: process.env.PORT
}

export const db = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    cors: process.env.CORS
}
