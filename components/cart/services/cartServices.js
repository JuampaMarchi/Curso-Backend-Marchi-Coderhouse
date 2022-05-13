const CartModel = require('../../../models/cart-model')
const pino = require('../../../utils/logger/pino')
const { CRUD, connection } = require('../../../config/db')

class CartServices {
    static client
    constructor(){
        if(CartServices.client) return CartServices.client
        CRUD()
        CartServices.client = connection
        this.client = CartServices.client
        this.collection = CartModel
    }
    async createCart(username, email, product){
        try {
            await this.collection.create({'owner_name': username, 'email': email, 'active': true, 'products': [product]})
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
    async update(id, data){
        try {
            const cartExists = await this.collection.exists({_id: id, active: true})
            if(!cartExists) throw new Error('El carrito esta cerrado o no existe')
            await this.collection.updateOne({_id: id}, {products: data})
        } catch (error) {
            pino.error(`Tuvimos este error ${error}`)
        }
    }
    async delete(id){
        try {
            const cartExists = await this.collection.exists({_id: id, active: true})
            if(!cartExists) throw new Error('El carrito esta cerrado o no existe')
            await this.collection.daleteOne({_id: id})
        } catch (error) {
            pino.error(`Tuvimos este error ${error}`)
        }
    }

}

module.exports = new CartServices()