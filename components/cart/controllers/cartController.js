const CartServices = require('../services/cartServices')
const pino = require('../../../utils/logger/pino')
const MailService = require('../../../utils/nodemailer/nodemailer')
const jwtServices = require('../../../utils/jwt/jwtService')

class CartController {
    async bringCart(req, res){
        try {
            const token = req.cookies.token
            const payload = jwtServices.verify(token)
            const cart = await CartServices.bringCart(payload.name)
            return res.status(200).render('cart', {user, cart})
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async endPurchase(req, res){
        try {
            const user = req.user
            const cart = await CartServices.bringCart(user.username)
            await CartServices.closeCart(user.username)
            MailService.orderAlert(cart)
            MailService.orderAlertAdmin(cart)
            return res.status(200).send('Compra finalizada con exito')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async addToCart(req, res){
        try {
            const data = {name: req.body.name, qty: Number(req.body.qty), price: Number(req.body.price)}
            const user = req.user
            await CartServices.addToCart(user.username, data)
            res.status(200).send('Producto agregado al carrito exitosamente')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async update(req, res){
        try {
            await CartServices.update(req.params.id, req.body)
            res.status(200).send('Carrito actualizado con exito')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async delete(req, res){
        try {
            await CartServices.delete(req.params.id)
            res.status(200).send('Carrito borrado con exito')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = new CartController()