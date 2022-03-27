const methods = require('../index')
const pino = require('../../../utils/logger/pino')

class CartController {
    async bringCart(req, res){
        try {
            const user = req.user
            const cart = await methods.bringCart(user.username)
            console.log('cart', cart)
            return res.render('cart', {user, cart})
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async endPurchase(req, res){
        try {
            const user = req.user
            await methods.closeCart(user.username)
            return res.send('Compra finalizada con exito')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = new CartController()