import knex from "knex";
import mongoose from "mongoose";
import { db } from "./index";

export const mysql = knex({
    client: mysql,
    connection: {
        ...db
    },
    pool: { min: 0, max: 7 }
})

export const sqlite = knex({
    client: 'sqlite3',
    connection: {
        filename: '/Users/juampa/Desktop/Curso Backend-Marchi-Coderhouse/db/clasecoder.sqlite'
    },
    useNullAsDefault: true
})

export const CRUD = async () => {
    try {
        const URL = db.mongo
        let rta = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Conectado a MongoDB')
    } catch (error) {
        console.log(error)
    }
}