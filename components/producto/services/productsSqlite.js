import { sqlite } from "../../../config/db.js";

export class ProductSqlite {
    static client
    constructor(){
        if(ProductSqlite.client){
            return ProductSqlite.client
        }
        ProductSqlite.client = sqlite
        this.client = ProductSqlite.client
    }
}

