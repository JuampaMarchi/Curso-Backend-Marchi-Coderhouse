import { productsMysql } from "../services/productsMariaDB.js"

export const getProducts = async (req, res) => {
    try {
        const list = await productsMysql.read()
        res.json(list)
    } catch (error) {
        console.log(`Tuvimos este error: ${error}`)
    }
}

export const insertProduct = async (req, res) => {
    try {
        const data = req.body
        await productsMysql.insert(data)
    } catch (error) {
        console.log(`Tuvimos este error: ${error}`)
    }
}

