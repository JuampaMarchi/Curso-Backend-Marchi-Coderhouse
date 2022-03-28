const cpus = require('os').cpus()
require('dotenv').config()


const dbConfig = {
    dev: process.env.NOD_ENV !== 'production',
    port: process.env.PORT || 5000,
    cpus: cpus.length,
    mode: process.env.MODE || 'NORMAL'
}

const db = {
    mongo_atlas: process.env.MONGO_ATLAS_URI,
    cors: process.env.CORS
}

const mailer = {
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    twilio_SID: process.env.TWILIO_SID,
    twilio_TOKEN: process.env.TWILIO_TOKEN,
    twilio_sender: process.env.TWILIO_SENDER
}

module.exports = { db, dbConfig, mailer }