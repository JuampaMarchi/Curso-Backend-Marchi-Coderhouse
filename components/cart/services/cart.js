const CartModel = require('../../../models/cart-model')
const pino = require('../../../utils/logger/pino')
const { CRUD, connection } = require('../../../config/db')

class CartDatabase {
    static client
    constructor(){
        if(CartDatabase.client) return CartDatabase.client
        CRUD()
        CartDatabase.client = connection
        this.client = CartDatabase.client
        this.collection = CartModel
    }
    async createCart(username, product){
        try {
            await this.collection.create({'owner_name': username, 'active': true, 'products': [product]})
            pino.info(`carrito para el usuario ${username} creado con exito`)
        } catch (error) {
            pino.error(`Tuvimos este error ${error}`)
        }
    }
    async addToCart(username, product){
        try {
            const cartExists = await this.collection.exists({owner_name: username, active: true})
            if(!cartExists) return this.createCart(username, product)
            pino.info('ya existe un carrito activo para este usuario, agregando producto al carrito activo')
            await this.collection.updateOne({owner_name: username},{$push: {'products': product}})
            pino.info(`carrito para el usuario ${username} actualizado con exito`)
        } catch (error) {
            pino.error(`Tuvimos este error ${error}`)
        }
    }
    async bringCart(username){
        try {
            const userCart = await this.collection.findOne({owner_name: username, active: true})
            if(!userCart) return false
            return userCart
        } catch (error) {
            pino.error(`Tuvimos este error ${error}`)
        }
    }
    async closeCart(username){
        try {
            const cartExists = await this.collection.exists({owner_name: username, active: true})
            if(!cartExists) return console.log('El carrito ya esta cerrado')
            await this.collection.updateOne({owner_name: username}, {active: false})
        } catch (error) {
            pino.error(`Tuvimos este error ${error}`)
        }
    }
}

module.exports = CartDatabase