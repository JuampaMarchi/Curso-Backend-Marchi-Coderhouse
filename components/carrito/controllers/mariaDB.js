import { cartMysql } from "../services/carritoMariaDB.js";

export const mysqlRead = async (req, res) => {
    try {
        const list = await cartMysql.read()
        res.json(list)
    } catch (error) {
        console.log(`Tuvimos el siguiente error: ${error}`)
        res.status(500)
    }
}
export const mysqlInsert = async (req, res) => {
    try {
        const data = req.body
        await cartMysql.insert(data)
        res.send('El producto fue insertado con exito')
    } catch (error) {
        console.log(`Tuvimos el siguiente error: ${error}`)
        res.status(500)
    }
}
export const mysqlUpdate = async (req, res) => {
    try {
        const id = req.params
        const data = req.body
        await cartMysql.update(id, data)
        res.send('El producto fue actualizado con exito')
    } catch (error) {
        console.log(`Tuvimos el siguiente error: ${error}`)
        res.status(500)
    }
}
export const mysqlDelete = async (req, res) => {
    try {
        const id = req.params
        await cartMysql.delete(id)
        res.send('El producto fue eliminado con exito')
    } catch (error) {
        console.log(`Tuvimos el siguiente error: ${error}`)
        res.status(500)
    }
}