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
        const { data } = req.body
        await productsMysql.insert(data)
        res.send('El producto se cargo correctamente')
    } catch (error) {
        console.log(`Tuvimos este error: ${error}`)
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { data } = req.body
        await productsMysql.update(id, data)
        res.send(`El producto con id "${id}" se actualizo correctamente`)
    } catch (error) {
        console.log(`Tuvimos este error: ${error}`)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        await productsMysql.delete(id)
        res.send(`El producto con id "${id}" se elimino correctamente`)
    } catch (error) {
        console.log(`Tuvimos este error: ${error}`)
    }
}

