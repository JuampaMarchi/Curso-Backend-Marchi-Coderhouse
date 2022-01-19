import { productosMongo } from "../services/productosMongo.js";

export const listar = async (req, res) => {
    try {
        const result = await productosMongo.list()
        res.json(result)
    } catch (error) {
        console.log(`Tuvimos este error: ${error}`)
        return res.status(500)
    }
}
export const insertar = async (req, res) => {
    try {
         const data = req.body
         await productosMongo.insert(data)
         res.send('El producto fue insertado con exito')
    } catch (error) {
        console.log(`Tuvimos este error: ${error}`)
        return res.status(500)
    }
}
export const insertarVarios = async (req, res) => {
    try {
        const data = req.body
        await productosMongo.insertMany(data)
        res.send('Los productos fueron insertados con exito')
    } catch (error) {
        console.log(`Tuvimos este error: ${error}`)
        return res.status(500)
    }
}
export const actualizar = async (req, res) => {
    try {
        const {query, data} = req.body
        await productosMongo.update(query, data)
        res.send('El producto fue actualizado con exito')
    } catch (error) {
        console.log(`Tuvimos este error: ${error}`)
        return res.status(500)
    }
}
export const borrar = async (req, res) => {
    try {
        const query = req.body
        await productosMongo.remove(query)
        res.send('El producto fue eliminado con exito')
    } catch (error) {
        console.log(`Tuvimos este error: ${error}`)
        return res.status(500)
    }
}