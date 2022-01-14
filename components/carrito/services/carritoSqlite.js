import { sqlite } from "../../../config/db.js"

export class CarritoSqlite {
    static client
    constructor(){
        if(Carrito.client){
            return Carrito.client
        }
        Carrito.client = sqlite
        this.client = Carrito.client
    }
    
}