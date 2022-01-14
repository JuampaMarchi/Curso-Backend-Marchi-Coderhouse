import { mysql } from "../../../config/db.js";

export class ProductMariaDB {
    static client
    constructor(){
        if(ProductMariaDB.client){
            return ProductMariaDB.client
        }
        ProductMariaDB.client = mysql
        this.client = ProductMariaDB.client
    }
}