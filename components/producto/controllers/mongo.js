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
        
    } catch (error) {
        console.log(`Tuvimos este error: ${error}`)
        return res.status(500)
    }
}