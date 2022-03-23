const sqlite = require('../index').sqlite

const db = sqlite.client

const createTable = async () => {
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
const insertMessage = async (data) => {
    try {
        await db('messages').insert(data)
        console.log('Mensaje ingresado con exito')
    } catch (error) {
        throw new Error(`Tuvimos el siguiente problema: ${error}`)
    }
}
const bringMessages = async () => {
    try {
        const res = await db.from('messages')
            return res
    } catch (error) {
        console.log(error)
    }
}
const bringMessagesByStamp = async (stamp) => {
    try {
        const res = await db.from('messages').where('sent_at', '=', `${stamp}`)
        const item = res[0]
        return item
    } catch (error) {
        console.log(error)
    }
}
const clearChat = async () => {
    try {
        await db.from('messages').del()
        console.log('Mensajes eliminados')
    } catch (error) {
        console.log(error)
    }
}

module.exports = { createTable, insertMessage, bringMessages, bringMessagesByStamp, clearChat }