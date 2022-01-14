import { ProductSqlite } from "./services/productsSqlite.js";
import { ProductMariaDB } from "./services/productsMariaDB.js";

export const productsSqlite = new ProductSqlite()

export const productsMariaDB = new ProductMariaDB()

