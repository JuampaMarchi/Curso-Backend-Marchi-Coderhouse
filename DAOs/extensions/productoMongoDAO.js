import { MongoDAO } from "../container/MongoDAO.js";
import { productos } from "../../models/products.js";

export class ProductoMongoDAO extends MongoDAO {
    constructor(){
        super(productos)
    }
}