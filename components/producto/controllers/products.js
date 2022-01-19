import { ProductDatabase } from "../../../DAOs/index.js"

export const getProducts = async (req, res) => {
    try {
        const list = await productSqlite.read()
        res.json(list)
    } catch (error) {
        console.log(`Tuvimos este error: ${error}`)
        return res.status(500)
    }
}
export const insertOneProduct = async (req, res) => {
    try {
        const { data } = req.body
        await productSqlite.insert(data)
        res.send('El producto se cargo correctamente')
    } catch (error) {
        console.log(`Tuvimos este error: ${error}`)
        return res.status(500)
    }
}
export const insertManyProducts = async (req, res) => {
    try {
        const { data } = req.body
        await productSqlite.insert(data)
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
        await productSqlite.update(id, data)
        res.send(`El producto con id "${id}" se actualizo correctamente`)
    } catch (error) {
        console.log(`Tuvimos este error: ${error}`)
        return res.status(500)
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        await productSqlite.delete(id)
        res.send(`El producto con id "${id}" se elimino correctamente`)
    } catch (error) {
        console.log(`Tuvimos este error: ${error}`)
        return res.status(500)
    }
}