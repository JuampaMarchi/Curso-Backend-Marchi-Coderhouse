import { mysql } from "../index.js";
const db = mysql.client

export const createTable = async () => {
    try {
        await db.schema.createTable('products', table => {
            table.increments('id')
            table.string('name')
            table.integer('price')
            table.timestamp('created_at').notNullable()
        }).then(console.log('Tabla creada con exito'))
    } catch (error) {
        throw new Error(`Tuvimos el siguiente problema: ${error}`)
    }
}

export const insertProduct = async (data) => {
    try {
        await db('products').insert(data)
        console.log('Productos ingresados con exito')
    } catch (error) {
        throw new Error(`Tuvimos el siguiente problema: ${error}`)
    }
}

export const bringProdByName = async (name) => {
    const prod = await db('products').where('name', '=', `${name}`)
    const item = prod[0]
    return item
}

export const bringLastProd = async () => {
    const lastProd = await db.from('products').whereRaw("SELECT MAX('created_at') FROM products")
    //const newProd = db.raw(`SELECT id, name, price, MAX('created_at') FROM products`)
    //await db.from('products').where('created_at', '=' , db.raw(`(SELECT MAX('created_at') FROM products)`))
    console.log('lastProd', lastProd)
    return lastProd
}

export const listProducts = async () => {
    try {
        const res = await db.from('products')
        return res
    } catch (error) {
        console.log(error)
    }
}