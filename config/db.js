const knex = require('knex')
const mongoose = require('mongoose')
const config = require('./index')

const mysql = knex({
    client: 'mysql',
    connection: {
        ...config.db
    },
    pool: { min: 0, max: 7 }
})

const sqlite = knex({
    client: 'sqlite3',
    connection: {
        filename: '/Users/juampa/Desktop/Curso Backend-Marchi-Coderhouse/db/clasecoder.sqlite'
    },
    useNullAsDefault: true
})

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

module.exports = { mysql, sqlite, connection, CRUD}

