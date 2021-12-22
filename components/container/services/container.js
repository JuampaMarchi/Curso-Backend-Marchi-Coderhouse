import { Database } from '../../../config/db.js'
const db_obj = new Database()
const db = db_obj.client

class Container {
    async write(){
        db.schema
    }
}

export default Container;