import { cartSqlite } from "../services/carritoSqlite.js";

export const sqliteRead = async (req, res) => {
    try {
        const list = await cartSqlite.read()
        res.json(list)
    } catch (error) {
        console.log(`Tuvimos el siguiente error: ${error}`)
        res.status(500)
    }
}
export const sqliteInsert = async (req, res) => {
    try {
        const data = req.body
        await cartSqlite.insert(data)
        res.send('El producto fue insertado con exito')
    } catch (error) {
        console.log(`Tuvimos el siguiente error: ${error}`)
        res.status(500)
    }
}
export const sqliteUpdate = async (req, res) => {
    try {
        const id = req.params
        const data = req.body
        await cartSqlite.update(id, data)
        res.send('El producto fue actualizado con exito')
    } catch (error) {
        console.log(`Tuvimos el siguiente error: ${error}`)
        res.status(500)
    }
}
export const sqliteDelete = async (req, res) => {
    try {
        const id = req.params
        await cartSqlite.delete(id)
        res.send('El producto fue eliminado con exito')
    } catch (error) {
        console.log(`Tuvimos el siguiente error: ${error}`)
        res.status(500)
    }
}