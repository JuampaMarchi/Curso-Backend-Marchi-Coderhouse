const orderServices = require('../services/orderServices')
const pino = require('../../../utils/logger/pino')
const authServices = require('../../auth/services/authService')

class Order {
    //Retorna todas las ordenes eixstentes en la base de datos
    async getAll(req, res){
        try {
            const token = req.cookies.token
            const payload = await authServices.verifyToken(token)
            if(!payload || payload.role != 'admin') return res.status(401).render('error-auth')
            const response = await orderServices.get()
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    //Retorna la orden correspondiente al id ingresado por params
    async getOne(req, res){
        try {
            const token = req.cookies.token
            const payload = await authServices.verifyToken(token)
            if(!payload || payload.role != 'admin') return res.status(401).render('error-auth')
            const { id } = req.params
            const response = await orderServices.getOne(id)
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    //Genera vista donde aparecen todas las ordenes del usuario dueño del token
    async getUserOrdersView(req, res){
        try {
            const token = req.cookies.token
            const payload = await authServices.verifyToken(token)
            if(!payload) return res.status(401).render('error-auth')
            const email = payload.email
            const response = await orderServices.getUserOrders(email)
            res.status(200).render('orders', {payload, response})
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
}

module.exports = new Order()