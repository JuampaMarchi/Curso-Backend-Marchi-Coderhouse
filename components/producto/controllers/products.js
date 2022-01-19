import { ProductDB } from "../services/database.js"

export const getProducts = async (req, res) => {
    try {
        const list = await ProductDB.read()
        res.json(list)
    } catch (error) {
        console.log(`Tuvimos este error: ${error}`)
        return res.status(500)
    }
}
export const insertOneProduct = async (req, res) => {
    try {
        const { data } = req.body
        await ProductDB.insertOne(data)
        res.send('El producto se cargo correctamente')
    } catch (error) {
        console.log(`Tuvimos este error: ${error}`)
        return res.status(500)
    }
}
export const insertManyProducts = async (req, res) => {
    try {
        const { data } = req.body
        await ProductDB.insertMany(data)
        res.send('Los productos se cargaron correctamente')
    } catch (error) {
        console.log(`Tuvimos este error: ${error}`)
        return res.status(500)
    }
}
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { data } = req.body
        await ProductDB.update(id, data)
        res.send(`El producto con id "${id}" se actualizo correctamente`)
    } catch (error) {
        console.log(`Tuvimos este error: ${error}`)
        return res.status(500)
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        await ProductDB.remove(id)
        res.send(`El producto con id "${id}" se elimino correctamente`)
    } catch (error) {
        console.log(`Tuvimos este error: ${error}`)
        return res.status(500)
    }
}