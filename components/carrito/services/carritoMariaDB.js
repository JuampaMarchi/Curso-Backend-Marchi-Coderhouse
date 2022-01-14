import { mysql } from "../../../config/db.js";

export class CarritoMariaDB {
    static client
    constructor(){
        if(Producto.client){
            return Producto.client
        }
        Producto.client = mysql
        this.client = Producto.client
    }

}