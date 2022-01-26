import moment from "moment";
import { CRUD, connection } from "../../../config/db.js";
import { ChatModel } from "../../../models/chat.js";

export class ChatLog {
    static client
    constructor(){
        if(ChatLog.client){
            return ChatLog.client
        }
        CRUD()
        ChatLog.client = connection
        this.client = ChatLog.client
        this.collection = ChatModel
    }
    async bringMessages () {
        try {
            let response = await this.collection.find()
            return response
        } catch (error) {
            console.log(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async insertMessage (data) {
        try {
            const item = {
                author: {
                    id: data.author.id,
                    nombre: data.author.nombre,
                    apellido: data.author.apellido,
                    edad: data.author.edad,
                    alias: data.author.alias,
                    avatar: `avatar_de_${data.author.alias}`
                },
                mensaje: data.mensaje,
                enviado: moment().format('DD/MM/YYYY HH:mm:ss')
            }
            const new_message = new this.collection(item)
            new_message.save()
            console.log('Mensaje enviado con exito')
        } catch (error) {
            console.log(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async arrayToObject(array) {
        try {
            const newObj = {
                author: {}
            }
        } catch (error) {
            console.log(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

