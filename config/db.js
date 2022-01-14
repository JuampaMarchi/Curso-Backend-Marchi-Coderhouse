import knex from "knex";
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