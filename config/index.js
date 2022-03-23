require('dotenv').config()

const dbConfig = {
    dev: process.env.NOD_ENV !== 'production',
    port: process.env.PORT || 5000
}

const db = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    mongo_host: process.env.MONGO_DB_URI,
    mongo_atlas: process.env.MONGO_ATLAS_URI,
    mongo_name: process.env.MONGO_DB_NAME,
    cors: process.env.CORS
}

module.exports = { db, dbConfig }