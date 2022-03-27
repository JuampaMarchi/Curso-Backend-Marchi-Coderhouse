const methods = require('../index')

class CartController {
    async bringCart(req, res){
        try {
            const user = req.user
            const cart = await methods.bringCart(user.username)
            console.log('cart', cart)
            return res.render('cart', {user, cart})
        } catch (error) {
            console.log(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async endPurchase(req, res){
        try {
            const user = req.user
            await methods.closeCart(user.username)
            return res.send('Compra finalizada con exito')
        } catch (error) {
            console.log(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = new CartController()