const database = require('../../../config/db')

class ProductContainer {
    static client
    constructor(){
        if(ProductContainer.client){
            return ProductContainer.client
        }
        ProductContainer.client = database.mysql
        this.client = ProductContainer.client
    }
}

class MessageContainer {
    static client
    constructor(){
        if(MessageContainer.client){
            return MessageContainer.client
        }
        MessageContainer.client = database.sqlite
        this.client = MessageContainer.client
    }
}

module.exports = { ProductContainer, MessageContainer}