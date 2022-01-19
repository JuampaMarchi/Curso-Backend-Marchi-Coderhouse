import { productsFirebase } from "../services/productoFirebase.js";

export const getAllProducts = async (req, res) => {
    try {
        const lista = await productsFirebase.read()
        res.json(lista)
    } catch (error) {
        console.log(`Tuvimos el siguiente problema: ${error}`)
        return res.status(500)
    }
}
export const insertOneProduct = async (req, res) => {
    try {
        const item = req.body
        await productsFirebase.insertOne(item)
        res.send('Producto cargado con exito')
    } catch (error) {
        console.log(`Tuvimos el siguiente problema: ${error}`)
        return res.status(500)
    }
}
export const insertManyProducts = async (req, res) => {
    try {
        const items = req.body
        await productsFirebase.insertMany(items)
        res.send('Productos cargado con exito')
    } catch (error) {
        console.log(`Tuvimos el siguiente problema: ${error}`)
        return res.status(500)
    }
}
export const updateProduct = async (req, res) => {
    try {
        const id = req.params
        const data = req.body
        await productsFirebase.update(id, data)
        res.send('Producto actualizado con exito')
    } catch (error) {
        console.log(`Tuvimos el siguiente problema: ${error}`)
        return res.status(500)
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const id = req.params
        await productsFirebase.delete(id)
        res.send('Producto eliminado con exito')
    } catch (error) {
        console.log(`Tuvimos el siguiente problema: ${error}`)
        return res.status(500)
    }
}