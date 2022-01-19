import { SqliteDAO } from '../container/SqliteDAO.js'

export class ProductSqliteDAO extends SqliteDAO {
    constructor(){
        super('products')
    }
}