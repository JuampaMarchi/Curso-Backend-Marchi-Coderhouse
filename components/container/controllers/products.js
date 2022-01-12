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
    try {
        const prod = await db('products').where('name', '=', `${name}`)
        const item = prod[0]
        return item
    } catch (error) {
        console.log(error)
    }
}

export const bringProdById = async (id) => {
    try {
        const prod = await db('products').where('id', '=', `${id}`)
        const item = prod[0]
        return item
    } catch (error) {
        console.log(error)    
    }
}

export const bringLastProd = async () => {
    try {
        const lastProd = await db.from('products').orderBy('created_at', 'desc').limit(1)
        const item = lastProd[0]
        return item
    } catch (error) {
        console.log(error)
    }
}

export const listProducts = async () => {
    try {
        const res = await db.from('products')
        return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteProducts = async (prodId) => {
    try {
        await db.from('products').where({id: prodId}).del()
    } catch (error) {
        console.log(error)
    }
}

export const updateName = async (prodId, value) => {
    try {
        await db.from('products').where({id: prodId}).update({name: value})
        console.log(`El producto con id "${prodId}" fue actualizado`)
    } catch (error) {
        console.log(error)
    }
}

export const updatePrice = async (prodId, value) => {
    try {
        await db.from('products').where({id: prodId}).update({price: value})
        console.log(`El producto con id "${prodId}" fue actualizado`)
    } catch (error) {
        console.log(error)
    }
}