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
    switch (db.engine) {
        case 'firebase':
            return database = new ProductFirebaseDAO()
        case 'mongo':
            return database = new CartMongoDAO()
        case 'mariaDB':
            return database = new ProductoMysqlDAO()
        case 'sqlite':
            return database = new ProductSqliteDAO()
        default:
            console.log('Error al cargar la base de datos.')
            break;
    }
}
export const CartDatabase = ()=>{
    switch (db.engine) {
        case 'firebase':
            return database = new CartFirebaseDAO()
        case 'mongo':
            return database = new ProductoMongoDAO()
        case 'mariaDB':
            return database = new CartMysqlDAO()
        case 'sqlite':
            return database = new CartSqliteDAO()
        default:
            console.log('Error al cargar la base de datos.')
            break;
    }
}