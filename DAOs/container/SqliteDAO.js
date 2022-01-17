import { sqlite } from "../../config/db.js"

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
            const response = await sqlite.client.from(this.table)
            return response
        } catch (error) {
            console.log(`Tuvimos este error: ${error}`)
        }
    }
    async insert(data){
        try {
            await sqlite.client(this.table).insert(data)
            console.log('Producto insertado con exito')
        } catch (error) {
            console.log(`Tuvimos este error: ${error}`)
        }
    }
    async update(id, data){
        try {
            await sqlite.client(this.table).where({id: id}).update(data)
            console.log('Producto actualizado con exito')
        } catch (error) {
            console.log(`Tuvimos este error: ${error}`)
        }
    }
    async delete(id){
        try {
            await sqlite.client(this.table).where({id: id}).del()
        } catch (error) {
            console.log(`Tuvimos este error: ${error}`)
        }
    }
}