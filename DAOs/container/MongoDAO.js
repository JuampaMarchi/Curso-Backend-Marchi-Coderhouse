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
        const result = await this.collection.find({})
        return result
    }
    async insert(data){
        await this.collection.insertOne(data)
        console.log('Item insertado')
    }
    async update(criteria, data){
        await this.collection.update(criteria, data)
        console.log('Item actualizado')
    }
    async remove(criteria){
        await this.collection.remove(criteria)
    }
}

