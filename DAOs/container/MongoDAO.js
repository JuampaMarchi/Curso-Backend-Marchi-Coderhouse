import { CRUD, connection } from "../../config/db.js";

export class MongoDAO {
    static client
    constructor(collection){
        if(MongoDAO.client){
            return MongoDAO.client
        }
        CRUD()
        MongoDAO.client = connection
        this.client = MongoDAO.client
        this.collection = collection
    }
    async list() {
        try {
            const result = await this.collection.find({})
            return result
        } catch (error) {
            console.log(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async insert(data){
        try {
            await this.collection.insertOne(data)
            console.log('Item insertado')
        } catch (error) {
            console.log(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async insertMany(data){
        try {
            await this.collection.insertMany(data)
            console.log('Items insertados')
        } catch (error) {
            console.log(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async update(criteria, data){
        try {
            await this.collection.update(criteria, data)
            console.log('Item actualizado')
        } catch (error) {
            console.log(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async remove(criteria){
        try {
            await this.collection.remove(criteria)
        } catch (error) {
            console.log(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

