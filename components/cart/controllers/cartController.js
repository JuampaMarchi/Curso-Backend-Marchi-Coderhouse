const CartServices = require('../services/cartServices')
const pino = require('../../../utils/logger/pino')
//const MailService = require('../../../utils/nodemailer/nodemailer')
const jwtServices = require('../../../utils/jwt/jwtService')

class CartController {
    //Ruta de carrito para postman, devuelve carrito
    async bringCart(req, res){
        try {
            const token = req.cookies.token
            const payload = await jwtServices.verify(token)
            if(!payload) return res.status(401).render('error_auth')
            const cart = await CartServices.bringCart(payload.name)
            return res.status(200).json(cart)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    //Vista del carrito para Frontend
    async bringCartView(req, res){
        try {
            const token = req.cookies.token
            const payload = await jwtServices.verify(token)
            if(!payload) return res.status(401).render('error_auth')
            const cart = await CartServices.bringCart(payload.name)
            return res.status(200).render('cart', {cart})
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    // async endPurchase(req, res){
    //     try {
    //         const user = req.user
    //         const cart = await CartServices.bringCart(user.username)
    //         await CartServices.closeCart(user.username)
    //         MailService.orderAlert(cart)
    //         MailService.orderAlertAdmin(cart)
    //         return res.status(200).send('Compra finalizada con exito')
    //     } catch (error) {
    //         pino.error(`Tuvimos el siguiente error: ${error}`)
    //     }
    // }
    async addToCart(req, res){
        try {
            const data = {name: req.body.name, qty: Number(req.body.qty), price: Number(req.body.price)}
            const token = req.cookies.token
            const payload = await jwtServices.verify(token)
            if(!payload) return res.status(401).render('error_auth')
            await CartServices.addToCart(payload.name, data)
            res.status(200).send('Producto agregado al carrito exitosamente')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    async update(req, res){
        try {
            const token = req.cookies.token
            const payload = await jwtServices.verify(token)
            if(!payload) return res.status(401).render('error_auth')
            await CartServices.update(req.params.id, req.body)
            res.status(200).send('Carrito actualizado con exito')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async delete(req, res){
        try {
            const token = req.cookies.token
            const payload = await jwtServices.verify(token)
            if(!payload && payload.role == 'admin') return res.status(401).render('error_auth')
            await CartServices.delete(req.params.id)
            res.status(200).send('Carrito borrado con exito')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = new CartController()