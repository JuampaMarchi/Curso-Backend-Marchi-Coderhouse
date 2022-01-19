import { MysqlDAO } from '../container/MysqlDAO.js'

export class CartMysqlDAO extends MysqlDAO {
    constructor(){
        super('cart')
    }
}