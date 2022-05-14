const ChatModel = require('../../../models/chat-model')
const pino = require('../../../utils/logger/pino')
const moment = require('../../../utils/moment/moment')
const { CRUD, connection } = require('../../../config/db')
const { isValidObjectId } = require('mongoose')

class Chat {
    static client
    constructor(){
        if(Chat.client) return Chat.client
        CRUD()
        Chat.client = connection
        this.client = Chat.client
        this.collection = ChatModel
    }
    async create(user, message){
        try {
            const item = {
                name: user.username,
                email: user.email,
                type: user.type,
                message,
                sent_at: await moment.date()
            }
            await this.collection.create(item)
            pino.info('mensaje insertado con exito')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async list(){
        try {
            const response = await this.collection.find({})
            console.log(response)
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