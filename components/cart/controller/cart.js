const CartServices = require('../index')
const pino = require('../../../utils/logger/pino')
const MailService = require('../../../utils/nodemailer/nodemailer')

class CartController {
    async bringCart(req, res){
        try {
            const user = req.user
            const cart = await CartServices.bringCart(user.username)
            return res.render('cart', {user, cart})
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
            return res.send('Compra finalizada con exito')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async addToCart(req, res){
        try {
            const data = {name: req.body.name, qty: Number(req.body.qty), price: Number(req.body.price)}
            const user = req.user
            await CartServices.addToCart(user.username, data)
            res.send('Producto agregado al carrito exitosamente')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async update(req, res){
        try {
            const { id } = req.params
            const data = req.body
            await CartServices
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = new CartController()