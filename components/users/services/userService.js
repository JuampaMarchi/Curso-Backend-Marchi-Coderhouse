const UserModel  = require('../../../models/user')
const pino = require('../../../utils/logger/pino')
const { CRUD, connection } = require('../../../config/db')
const Bcrypt = require('../../../utils/bcrypt/index')

class UserDatabase {
    static client
    constructor(){
        if(UserDatabase.client) return UserDatabase.client
        CRUD()
        UserDatabase.client = connection
        this.client = UserDatabase.client
        this.collection = UserModel
    }
    async insert(user_data){
        try {
            const user = {'username': user_data.username, 'password': Bcrypt.encrypt(user_data.password), 'email': user_data.email}
            await this.collection.create(user)
            pino.info(`Usuario ${user_data.username} creado con exito!`)
            return user
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async findAll(){
        try {
            const response = await this.collection.find({})
            return response
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async findByName(name){
        try {
            const response = await this.collection.findOne({username: name})
            return response
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async findById(id){
        try {
            const response = await this.collection.findById({_id: id})
            return response
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async update(id, data){
        try {
            const response = await this.collection.findById({_id: id})
            if(!response) throw new Error('No se encontro a ningun usuario con ese id')
            await this.collection.updateOne({_id: id}, data)
            pino.info('Usuario actualizado con exito')
            return response
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async delete(id){
        try {
            const response = await this.collection.findById({_id: id})
            if(!response) throw new Error('No se encontro a ningun usuario con ese id')
            await this.collection.deleteOne({_id: id})
            pino.info('Mensaje eliminado con exito')
            return response
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = new UserDatabase()

