const CartServices = require('../services/cartServices')
const OrderServices = require('../../users/services/orderServices')
const AuthServices = require('../../auth/services/authService')
const pino = require('../../../utils/logger/pino')
const MailService = require('../../../utils/nodemailer')

class CartController {
    //Ruta de carrito para postman, devuelve carrito
    async bringCart(req, res){
        try {
            const token = req.cookies.token
            const payload = await AuthServices.verifyToken(token)
            if(!payload) return res.status(401).render('error_auth')
            const cart = await CartServices.bringCart(payload.name)
            return res.status(200).render('cart', {payload, cart})
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    //Vista del carrito para Frontend
    async bringAll(req, res){
        try {
            const token = req.cookies.token
            const payload = await AuthServices.verifyToken(token)
            if(!payload || payload.role != 'admin') return res.status(401).render('error_auth')
            const cartList = await CartServices.bringAll()
            return res.status(200).json(cartList)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    //Finaliza compra, cerrando carrito y creando orden notificando a usuario y admin
    async endPurchase(req, res){
        try {
            const token = req.cookies.token
            const payload = await AuthServices.verifyToken(token)
            if(!payload) return res.status(401).render('error_auth')
            const cart = await CartServices.bringCart(payload.name)
            await CartServices.closeCart(payload.name)
            await OrderServices.create(payload, cart)
            await MailService.orderAlert(payload, cart)
            await MailService.orderAlertAdmin(payload, cart)
            return res.status(200).render('after_purchase', {payload})
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    //Agrega elementos al carrito, o crea uno si el usuario no tiene o tuvo uno cerrado
    async addToCart(req, res){
        try {
            const { name, qty, price} = req.body
            const token = req.cookies.token
            const payload = await AuthServices.verifyToken(token)
            if(!payload) return res.status(401).render('error_auth')
            await CartServices.addToCart(payload, {name: name, qty: Number(qty), price: Number(price)})
            res.status(200).send('Producto agregado al carrito exitosamente')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    //Recibe un array con productos nuevos, y reemplaza a los productos en el carrito actual 
    async updateQty(req, res){
        try {
            const token = req.cookies.token
            const payload = await AuthServices.verifyToken(token)
            if(!payload) return res.status(401).render('error_auth')
            const array = Object.values(req.body)
            const newCart = [] 
            for (const item of array[0]) newCart.push({name: item}) 
            for (let i = 0; i < newCart.length; i++) newCart[i].price = Number(array[1][i])
            for (let i = 0; i < newCart.length; i++) newCart[i].qty = Number(array[2][i])
            await CartServices.update(payload.name, newCart)
            res.status(200).render('after_update', {payload})
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    //Controlado para que el administrador pueda actualizar el carrito. Recibe array de objetos e id.
    async update(req, res){
        try {
            const token = req.cookies.token
            const payload = await AuthServices.verifyToken(token)
            if(!payload || payload.role != 'admin') return res.status(401).render('error_auth')
            await CartServices.update(payload.name, req.body)
            res.status(200).send('carrito actualizado exitosamente')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async delete(req, res){
        try {
            const token = req.cookies.token
            const payload = await AuthServices.verifyToken(token)
            if(!payload || payload.role != 'admin') return res.status(401).render('error_auth')
            await CartServices.delete(req.params.id)
            res.status(200).send('Carrito borrado con exito')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = new CartController()