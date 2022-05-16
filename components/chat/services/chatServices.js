const ChatModel = require('../../../models/chat-model')
const pino = require('../../../utils/logger/pino')
const { CRUD, connection } = require('../../../config/db')

class Chat {
    static client
    constructor(){
        if(Chat.client) return Chat.client
        CRUD()
        Chat.client = connection
        this.client = Chat.client
        this.collection = ChatModel
    }
    async createSession(data){
        try {
            const session = await this.collection.create(data)
            return session
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async insertMessage(id, data){
        try {
            const session = await this.collection.findById({_id: id})
            if(!session) {
                pino.info('No existe ninguna sesion con ese id, creando nueva sesion...')
                const newSession = await this.createSession(data)
                return newSession
            }
            await this.collection.updateOne({id}, {$push: {messages: data}})
            pino.info('mensaje insertado con exito')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async listAll(){
        try {
            const response = await this.collection.find({})
            return response
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async listForChat(date){
        try {
            const response = await this.collection.find({sent_at: {$gte: date}})
            return response
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async update(id, newMessage){
        try {
            const response = await this.collection.findById({_id: id})
            if(!response) throw new Error('No se encontro ningun mensaje con ese id')
            await this.collection.updateOne({_id: id}, {message: newMessage})
            pino.info('Mensaje actualizado con exito')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async delete(id){
        try {
            const response = await this.collection.findById({_id: id})
            if(!response) throw new Error('No se encontro ningun mensaje con ese id')
            await this.collection.deleteOne({_id: id})
            pino.info('Mensaje eliminado con exito')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = new Chat()