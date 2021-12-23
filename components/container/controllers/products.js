import { mysql } from "../index.js";

const db = mysql.client

export const createTable = async () => {
    try {
        await db.schema.createTable('products', table => {
            table.increments('id')
            table.string('name')
            table.integer('price')
        }).then(console.log('Tabla creada con exito'))
    } catch (error) {
        throw new Error(`Tuvimos el siguiente problema: ${error}`)
    }
}

export const insertProduct = async (data) => {
    try {
        await db('products').insert(data)
            .then(console.log('Productos ingresados con exito'))
    } catch (error) {
        throw new Error(`Tuvimos el siguiente problema: ${error}`)
    }
}

export const listProducts = async () => {
    try {
        let response = []
        await db.from('products')
            .then((rows)=>{
                for (const row of rows) {
                    response.push({id: row['id'], name: row['name'], price: row['price']})
                }
            })
            return response
    } catch (error) {
        console.log(error)
    }
}