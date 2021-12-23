import knex from "knex";
import { db } from "./index.js";

export const mysql = knex({
    client: 'mysql',
    connection: {
        ...db
    },
    pool: { min: 0, max: 7 }
})

export const sqlite = knex({
    client: 'sqlite3',
    connection: {
        filename: '../db/clasedatabase.sqlite'
    },
    useNullAsDefault: true
})


