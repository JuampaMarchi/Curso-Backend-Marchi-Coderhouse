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
        console.log('Productos ingresados con exito')
        const res = await db.from('products')
        console.log(res)
        return res
    } catch (error) {
        throw new Error(`Tuvimos el siguiente problema: ${error}`)
    }
}

export const listProducts = async () => {
    try {
        //let response = []
        const res = await db.from('products')
        // for (const row of res) {
        //     response.push({id: row['id'], name: row['name'], price: row['price']})
        // }
        return res
    } catch (error) {
        console.log(error)
    }
}