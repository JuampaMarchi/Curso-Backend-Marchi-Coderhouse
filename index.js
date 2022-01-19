import { Server } from "./server/server.js";
import { db } from "./config/index.js";

(()=>{
    let productDatabase = '';
    switch (db.db_engine) {
        case 'firebase':
            productDatabase = new ProductFirebaseDAO()
            break;
        case 'mongo':
            productDatabase = new ProductoMongoDAO()
            break;
        case 'mariaDB':
            productDatabase = new ProductoMysqlDAO()
            break;
        case 'sqlite':
            productDatabase = new ProductSqliteDAO()
            break;
        default:
            break;
    }
    module.exports = { productDatabase }
})

const server = new Server()

server.listen()