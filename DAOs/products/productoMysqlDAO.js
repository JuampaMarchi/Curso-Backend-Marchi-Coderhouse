import { MysqlDAO } from "../container/MysqlDAO.js";

export class ProductoMysqlDAO extends MysqlDAO {
    constructor(){
        super('products')
    }
}