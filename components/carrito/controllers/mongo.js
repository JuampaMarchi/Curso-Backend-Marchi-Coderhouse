import { cartMongo } from "../services/carritoMongo.js";

export const mongoRead = async (req, res) => {
    try {
        const list = await cartMongo.list()
        res.json(list)
    } catch (error) {
        console.log(`Tuvmos el siguiente error: ${error}`)
        res.status(500)
    }
}
export const mongoInsert = async (req, res) => {
    try {
        const data = req.body
        await cartMongo.insert(data)
        res.send('El producto fue insertado con exito')
    } catch (error) {
        console.log(`Tuvmos el siguiente error: ${error}`)
        res.status(500)
    }
}
export const mongoInsertMany = async (req, res) => {
    try {
        const data = req.body
        await cartMongo.insertMany(data)
        res.send('Los producto fueron insertados con exito')
    } catch (error) {
        console.log(`Tuvmos el siguiente error: ${error}`)
        res.status(500)
    }
}
export const mongoUpdate = async (req, res) => {
    try {
        const {query, data} = req.body
        await cartMongo.update(query, data)
        res.send('El producto fue actualizado con exito')
    } catch (error) {
        console.log(`Tuvmos el siguiente error: ${error}`)
        res.status(500)
    }
}
export const mongoDelete = async (req, res) => {
    try {
        const query = req.body
        await cartMongo.remove(query)
        res.send('El producto fue eliminado con exito')
    } catch (error) {
        console.log(`Tuvmos el siguiente error: ${error}`)
        res.status(500)
    }
}