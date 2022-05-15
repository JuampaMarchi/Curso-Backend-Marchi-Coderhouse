const productServices = require('../services/productServices')
const pino = require('../../../utils/logger/pino')
const authServices = require('../../auth/services/authService')

class Product {
    //Controlador que retorna el listado de productos
    async getAll(req, res){
        try {
            const token = req.cookies.token
            const payload = await authServices.verifyToken(token)
            if(!payload) return res.status(401).render('error-auth')
            const products = await productServices.getAll()
            res.status(200).json(products)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    //Controlador que retorna una vista con listado de productos
    async getAllView(req, res){
        try {
            const token = req.cookies.token
            const payload = await authServices.verifyToken(token)
            if(!payload) return res.status(401).render('error-auth')
            const products = await productServices.getAll()
            res.status(200).render('products', {payload, products})
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    //Controlador que retorna el producto solicitado por id
    async getOne(req, res){
        try {
            const token = req.cookies.token
            const payload = await authServices.verifyToken(token)
            if(!payload) return res.status(401).render('error-auth')
            const { id } = req.params
            const product = await productServices.getOne(id)
            res.status(200).render('product_detail', {payload, product})
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    //Controlador que retorna una vista con el producto solicitado por id
    async getOneView(req, res){
        try {
            const token = req.cookies.token
            const payload = await authServices.verifyToken(token)
            if(!payload) return res.status(401).render('error-auth')
            const { id } = req.params
            const products = await productServices.getOne(id)
            res.status(200).render('products', {payload, products})
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    //Controlador encargado de ingresar productos a la base de datos
    async create(req, res){
        try {
            const token = req.cookies.token
            const payload = await authServices.verifyToken(token)
            if(!payload || payload.role != 'admin') return res.status(401).render('error-auth')
            const data = req.body
            await productServices.create(data)
            res.status(200).json(data)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    //Controlador encargado de ingresar productos a la base de datos
    async update(req, res){
        try {
            const token = req.cookies.token
            const payload = await authServices.verifyToken(token)
            if(!payload || payload.role != 'admin') return res.status(401).render('error-auth')
            const { id } = req.params
            const data = req.body
            await productServices.update(id, data)
            res.status(200).json(data)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    //Controlador encargado de ingresar productos a la base de datos
    async delete(req, res){
        try {
            const token = req.cookies.token
            const payload = await authServices.verifyToken(token)
            if(!payload || payload.role != 'admin') return res.status(401).render('error-auth')
            const { id } = req.params
            await productServices.delete(id)
            res.status(200).json(data)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
}

module.exports = new Product
