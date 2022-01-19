import { mysql } from "../../config/db.js"

export class MysqlDAO {
    static client
    constructor(table){
        if(MysqlDAO.client){
            return MysqlDAO.client
        }
        MysqlDAO.client = mysql
        this.client = MysqlDAO.client
        this.table = table
    }
    async read(){
        try {
            const response = await this.client.from(this.table)
            return response
        } catch (error) {
            console.log(`Tuvimos este error: ${error}`)
        }
    }
    async insertOne(data){
        try {
            await this.client(this.table).insert(data)
            console.log('Producto insertado con exito')
        } catch (error) {
            console.log(`Tuvimos este error: ${error}`)
        }
    }
    async update(id, data){
        try {
            await this.client(this.table).where({id: id}).update(data)
            console.log('Producto actualizado con exito')
        } catch (error) {
            console.log(`Tuvimos este error: ${error}`)
        }
    }
    async remove(id){
        try {
            await this.client(this.table).where({id: id}).del()
        } catch (error) {
            console.log(`Tuvimos este error: ${error}`)
        }
    }
}