const { UserModel } = require('../../../models/user')
const { CRUD, connection } = require('../../../config/db')
const { encrypt } = require('../../../utils/bcrypt/index')

class UserDatabase {
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
            const response = await this.collection.findOne({username: name})
            return response
        } catch (error) {
            console.log(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async insert(user_data){
        try {
            await this.collection.create({'username': user_data.username, 'password': encrypt(user_data.password)})
            console.log(`Usuario ${user_data.username} creado con exito!`)
        } catch (error) {
            console.log(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = UserDatabase

