import { SqliteDAO } from '../container/SqliteDAO.js'

export class CartSqliteDAO extends SqliteDAO {
    constructor(){
        super('cart')
    }
}