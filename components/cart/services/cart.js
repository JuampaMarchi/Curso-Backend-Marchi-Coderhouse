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
    async createCart(username, product){
        try {
            await this.collection.create({'owner_name': username, 'products': [product]})
        } catch (error) {
            console.log(`Tuvimos este error ${error}`)
        }
    }
}

module.exports = CartDatabase