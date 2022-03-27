const mongoose = require('mongoose')
const config = require('./index')

let connection;

const CRUD = async () => {
    try {
        const URL = config.db.mongo_atlas
        connection = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { connection, CRUD }

