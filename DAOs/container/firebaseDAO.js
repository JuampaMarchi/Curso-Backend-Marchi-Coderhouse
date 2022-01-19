import { db as firebaseDB } from "../../utils/firebase/index.js";

export class FirebaseDAO {
    static client
    constructor(collection){
        if(FirebaseDAO.client){
            return FirebaseDAO.client
        }
        FirebaseDAO.client = firebaseDB.collection(collection)
        this.client = FirebaseDAO.client
        this.query = firebaseDB.collection(collection)
    }
    async read() {
        try {
            const querySnapshot = await this.query.get()
            const docs = querySnapshot.docs;
    
            const response = docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
                price: doc.data().price,
                stock: doc.data().stock
            }))
            return response
        } catch (error) {
            console.log(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async insertOne(item_id, data) {
        try {
            let id = item_id
            let doc = this.query.doc(`${id}`)
            await doc.create(data)
            console.log('Producto insertado con exito')
        } catch (error) {
            console.log(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async insertMany(item_id, data) {
        try {
            let id = item_id
            let doc = this.query.doc(`${id}`)
            for (const item of data) {
                doc.create(item)
                id++
            }
            console.log(`${data.length} productos insertados con exito`)
        } catch (error) {
            console.log(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async update(item_id, data) {
        try {
            const doc = this.query.doc(`${item_id}`)
            await doc.update(data)
            console.log(`El producto con id "${item_id}" fue actualizado`)
        } catch (error) {
            console.log(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async delete(item_id) {
        try {
            const doc = this.query.doc(`${item_id}`)
            await doc.delete()
            console.log(`El producto con id "${item_id}" fue eliminado`)
        } catch (error) {
            console.log(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

