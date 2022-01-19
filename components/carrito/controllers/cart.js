import { CartDB } from "../services/database.js"

export const getCarts = async (req, res) => {
    try {
        const list = await CartDB.read()
        res.json(list)
    } catch (error) {
        console.log(`Tuvimos el siguiente error: ${error}`)
        res.status(500)
    }
}
export const insertCart = async (req, res) => {
    try {
        const { data } = req.body
        await CartDB.insertOne(data)
        res.send('El producto fue insertado con exito')
    } catch (error) {
        console.log(`Tuvimos el siguiente error: ${error}`)
        res.status(500)
    }
}
export const updateCart = async (req, res) => {
    try {
        const { id } = req.params
        const { data } = req.body
        await CartDB.update(id, data)
        res.send('El producto fue actualizado con exito')
    } catch (error) {
        console.log(`Tuvimos el siguiente error: ${error}`)
        res.status(500)
    }
}
export const deleteCart = async (req, res) => {
    try {
        const { id } = req.params
        await CartDB.remove(id)
        res.send('El producto fue eliminado con exito')
    } catch (error) {
        console.log(`Tuvimos el siguiente error: ${error}`)
        res.status(500)
    }
}