import { UserModel } from "../../../models/user.js";
import { CRUD, connection } from "../../../config/db.js";

export class UserDatabase {
    static client
    constructor(){
        if(UserDatabase.client) return UserDatabase.client
        CRUD()
        UserDatabase.client = connection
        this.client = UserDatabase.client
        this.collection = UserModel
    }
    async findByName(name){
        try {
            const response = await this.collection.findOne({'user_name': name})
            return response
        } catch (error) {
            console.log(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async insert(user_data){
        try {
            await this.collection.create({'user_name': user_data.name, 'password': user_data.password})
        } catch (error) {
            console.log(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

