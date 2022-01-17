import { mysql } from "../../config/db.js"

const db = mysql.client

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