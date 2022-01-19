import { FirebaseDAO } from "../container/firebaseDAO.js";

export class ProductFirebaseDAO extends FirebaseDAO {
    constructor(){
        super('products')
    }
}