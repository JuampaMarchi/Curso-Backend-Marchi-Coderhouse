const UserModel  = require('../../../models/user-model')
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
    //Crear Usuario
    async create(user_data){
        try {
            const pass = await Bcrypt.encrypt(user_data.password)
            const user = {'username': user_data.username, "fullname": user_data.fullname, 'password': pass, 'email': user_data.email, 'role': 'user'}
            await this.collection.create(user)
            pino.info(`Usuario ${user_data.username} creado con exito!`)
            return user
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    //Traer todos los usuarios
    async findAll(){
        try {
            const response = await this.collection.find({})
            return response
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    //Encontrar usuario por nombre de usuario
    async findByName(name){
        try {
            const response = await this.collection.findOne({username: name})
            return response
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    //Encontrar usuario por id 
    async findById(id){
        try {
            const response = await this.collection.findOne({_id: id})
            return response
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    //Actualizar usuario
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
    //Borrar usuario
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

