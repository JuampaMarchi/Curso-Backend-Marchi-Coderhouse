import { sqlite, mysql } from "../../../config/db.js";

export class ProductContainer {
    static client
    constructor(){
        if(ProductContainer.client){
            return ProductContainer.client
        }
        ProductContainer.client = mysql
        this.client = ProductContainer.client
    }
}

export class MessageContainer {
    static client
    constructor(){
        if(MessageContainer.client){
            return MessageContainer.client
        }
        MessageContainer.client = sqlite
        this.client = MessageContainer.client
    }
}