require('dotenv').config()

const config = {
    dev: process.env.NOD_ENV !== 'production',
    port: process.env.PORT || 5000,
    cors: process.env.CORS,
    authJWTService: process.env.JWT_SECRET,
    expireTimeToken: process.env.JWT_EXPIRES_IN,
    algorithmToken: process.env.JWT_ALGORITHM,
    saltCrypt: process.env.SALT_ROUNDS
}

const db = {
    mongo_atlas: process.env.MONGO_ATLAS_URI,
}

const mailer = {
    user: process.env.MAIL_USER,
    admin_user: process.env.MAIL_ADMIN_USER,
    password: process.env.MAIL_PASSWORD
}

module.exports = { db, config, mailer }