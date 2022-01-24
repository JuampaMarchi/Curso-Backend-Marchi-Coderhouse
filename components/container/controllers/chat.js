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
    async insertMessage () {
        try {
            const item = {
                author: {
                    id: 'pepe@pepe.com',
                    nombre: 'Pedro',
                    apellido: 'Jimenez',
                    edad: '25',
                    alias: 'Pepe',
                    avatar: 'avatar_pedro'
                },
                mensaje: 'Buenas, todo tranqui aca. Ustedes ??',
                enviado: moment().format('DD/MM/YYYY HH:mm:ss')
            }
            const new_message = new this.collection(item)
            new_message.save()
            console.log('Mensaje enviado con exito')
        } catch (error) {
            console.log(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

