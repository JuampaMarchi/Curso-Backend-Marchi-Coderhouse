import { cartFirebase } from "../services/carritoFirebase.js";

export const firebaseRead = async (req, res) => {
    try {
        const list = await cartFirebase.read()
        res.json(list)
    } catch (error) {
        console.log(`Tuvimos el siguiente error: ${error}`)
        res.status(500)
    }
}
export const firebaseInsertOne = async (req, res) => {
    try {
        const { id } = req.query
        const data = req.body
        await cartFirebase.insertOne(id, data)
        res.send('El producto fue ingresado exitosamente')
    } catch (error) {
        console.log(`Tuvimos el siguiente error: ${error}`)
        res.status(500)
    }
}
export const firebaseInsertMany = async (req, res) => {
    try {
        const { id } = req.query
        const data = req.body
        await cartFirebase.insertMany(id, data)
        res.send('Los productos fueron ingresados exitosamente')
    } catch (error) {
        console.log(`Tuvimos el siguiente error: ${error}`)
        res.status(500)
    }
}
export const firebaseUpdate = async (req, res) => {
    try {
        const id = req.params
        const data = req.body
        await cartFirebase.update(id, data)
        res.send('El producto fue actualizado exitosamente')
    } catch (error) {
        console.log(`Tuvimos el siguiente error: ${error}`)
        res.status(500)
    }
}
export const firebaseDelete = async (req, res) => {
    try {
        const id = req.params
        await cartFirebase.delete(id)
        res.send('El producto fue eliminado exitosamente')
    } catch (error) {
        console.log(`Tuvimos el siguiente error: ${error}`)
        res.status(500)
    }
}
