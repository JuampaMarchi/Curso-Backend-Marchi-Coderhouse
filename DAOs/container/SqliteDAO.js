import { sqlite } from "../../config/db.js"

const db = sqlite.client

export class SqliteDAO {
    static client
    constructor(table){
        if(SqliteDAO.client){
            return SqliteDAO.client
        }
        SqliteDAO.client = sqlite
        this.client = SqliteDAO.client
        this.table = table
    }
    async read(){
        try {
            const response = await db.from(this.table)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    async insert(data){
        try {
            await db(this.table).insert(data)
            console.log('Producto insertado con exito')
        } catch (error) {
            console.log(error)
        }
    }
    async update(id, data){
        try {
            await db(this.table).where({id: id}).update(data)
            console.log('Producto actualizado con exito')
        } catch (error) {
            console.log(error)
        }
    }
    async delete(id){
        try {
            await db(this.table).where({id: id}).del()
        } catch (error) {
            console.log(error)
        }
    }
}