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
        await db.from('products')
            .then((rows)=>{
                for (const row of rows) {
                    console.log(`Id: ${row['id']} - Nombre: ${row['name']} - Precio: ${row['price']}`)
                }
            })
    } catch (error) {
        console.log(error)
    }
}