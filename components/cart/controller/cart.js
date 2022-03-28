const methods = require('../index')
const pino = require('../../../utils/logger/pino')
const MessageServer = require('../../../utils/messages/twilio')
const MailService = require('../../../utils/nodemailer/nodemailer')

class CartController {
    async bringCart(req, res){
        try {
            const user = req.user
            const cart = await methods.bringCart(user.username)
            return res.render('cart', {user, cart})
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async endPurchase(req, res){
        try {
            const user = req.user
            const cart = await methods.bringCart(user.username)
            //await methods.closeCart(user.username)
            //MessageServer.sendMessage('+543516887790')
            MailService.orderAlert(cart)
            return res.send('Compra finalizada con exito')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = new CartController()