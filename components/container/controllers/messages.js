import { sqlite } from "../index.js";

const db = sqlite.client

export const createTable = async () => {
    try {
        await db.schema.createTable('messages', table => {
            table.increments('id').primary(),
            table.string('user_name'),
            table.string('message'),
            table.timestamp('sent_at')
        }).then(console.log('Tabla creada con exito'))
    } catch (error) {
        console.log(`Tuvimos el siguiente problema: ${error}`)
    }
}
export const insertMessage = async (data) => {
    try {
        await db('messages').insert(data)
        console.log('Mensaje ingresado con exito')
    } catch (error) {
        throw new Error(`Tuvimos el siguiente problema: ${error}`)
    }
}
export const bringMessages = async () => {
    try {
        let response = []
        await db.from('messages')
            .then((rows)=>{
                for (const row of rows) {
                    response.push({id: row['id'], user: row['user_name'], message: row['message'], sent_at: row['sent_at']})
                }
            })
            console.log(response)
            return response
    } catch (error) {
        console.log(error)
    }
}