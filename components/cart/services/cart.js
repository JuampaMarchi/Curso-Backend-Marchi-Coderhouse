const CartModel = require('../../../models/cart-model')
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
    // async checkCart(username){
    //     try {
    //         const exists = await this.collection.exists({owner_name: username, active: true})
    //         return exists
    //     } catch (error) {
    //         console.log(`Tuvimos este error ${error}`)
    //     }
    // }
    async createCart(username, product){
        try {
            await this.collection.create({'owner_name': username, 'active': true, 'products': [product]})
            console.log(`carrito para el usuario ${username} creado con exito`)
        } catch (error) {
            console.log(`Tuvimos este error ${error}`)
        }
    }
    async addToCart(username, product){
        try {
            const cartExists = await this.collection.exists({owner_name: username, active: true})
            if(!cartExists) return this.createCart(username, product)
            console.log('ya existe un carrito activo para este usuario, agregando producto al carrito activo')
            await this.collection.updateOne({owner_name: username},{$push: {'products': product}})
            console.log(`carrito para el usuario ${username} actualizado con exito`)
        } catch (error) {
            console.log(`Tuvimos este error ${error}`)
        }
    }
}

module.exports = CartDatabase