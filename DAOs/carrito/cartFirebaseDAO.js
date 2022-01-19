import { FirebaseDAO } from "../container/firebaseDAO.js";

export class CartFirebaseDAO extends FirebaseDAO {
    constructor(){
        super('cart')
    }
}