import { CarritoSqlite } from "./services/carritoSqlite.js";
import { CarritoMariaDB } from "./services/carritoMariaDB.js";

export const cartSqlite = new CarritoSqlite()

export const cartMariaDB = new CarritoMariaDB()