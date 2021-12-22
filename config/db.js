import knex from 'knex'
import { db } from './index.js'

const sqlite = knex({
    client: 'sqlite3',
    connection: { 
        filename: '../db/juanpablodb.sqlite'
    },
    useNullAsDefault: true
    })

const mysql = knex({
    client: 'mysql',
    connection: {
        ...db
    },
    pool: { min: 0, max: 7 }
})

export class Database {
    static client
    constructor(){
        if(Database.client){
            return Database.client
        }
        Database.client = sqlite
        this.client = Database.client
    }
}

