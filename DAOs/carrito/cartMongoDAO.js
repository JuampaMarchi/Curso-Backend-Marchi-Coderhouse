import { MongoDAO } from "../container/MongoDAO.js";
import { CartModel } from "../../models/cart.js";

export class CartMongoDAO extends MongoDAO {
    constructor(){
        super(CartModel)
    }
}