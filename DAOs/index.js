import { db } from "../config/index.js"
import { ProductFirebaseDAO } from "./products/productoFirebaseDAO.js";
import { ProductoMongoDAO } from "./products/productoMongoDAO.js";
import { ProductoMysqlDAO } from "./products/productoMysqlDAO.js";
import { ProductSqliteDAO } from "./products/productoSqliteDAO.js";
import { CartFirebaseDAO } from './carrito/cartFirebaseDAO.js'
import { CartMongoDAO } from './carrito/cartMongoDAO.js'
import { CartMysqlDAO } from "./carrito/cartMysqlDAO.js";
import { CartSqliteDAO } from './carrito/cartSqliteDAO.js'

export const ProductDatabase = ()=>{
    let database;
    switch (db.engine) {
        case 'firebase':
            database = new ProductFirebaseDAO()
            return database
        case 'mongo':
            database = new CartMongoDAO()
            return database
        case 'mariaDB':
            database = new ProductoMysqlDAO()
            return database
        case 'sqlite':
            database = new ProductSqliteDAO()
            return database
        default:
            console.log('Error al cargar la base de datos.')
            break;
    }
}
export const CartDatabase = ()=>{
    let database;
    switch (db.engine) {
        case 'firebase':
            database = new CartFirebaseDAO()
            return database
        case 'mongo':
            database = new ProductoMongoDAO()
            return database
        case 'mariaDB':
            database = new CartMysqlDAO()
            return database
        case 'sqlite':
            database = new CartSqliteDAO()
            return database
        default:
            console.log('Error al cargar la base de datos.')
            break;
    }
}