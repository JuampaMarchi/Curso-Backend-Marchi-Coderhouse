const OrderModel = require('../../../models/order-model')
const pino = require('../../../utils/logger/pino')
const jwtServices = require('../../../utils/jwt/jwtService')
const mailer = require('../../../utils/nodemailer/nodemailer')
const { CRUD, connection } = require('../../../config/db')

class Order {
    static client
    constructor(){
        if(Order.client) return Order.client
        CRUD()
        Order.client = connection
        this.client = Order.client
        this.collection = OrderModel
    }
    async create(data){
        try {
            let id = 1
            const exist = await this.collection.find({})
            if(exist.length > 1) id = exist.length + 1
            await this.collection.create({order_id: id, email: data.email, status: 'creada', products: data.products})
            pino.info(`Orden nro. ${id} generada con exito`)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error`)
        }
    }
    async closeOrder(id){
        try {
            const order = await this.collection.findOne({order_id: id})
            if(!order) throw new Error(`La orden con id ${id} no existe`)
            await this.collection.findOneAndRemove({order_id: id})
            pino.info(`Orden nro. ${id} generada con exito`)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error`)
        }
    }
    async update(){
        try {
            const order = await this.collection.findOne({order_id: id})
            if(!order) throw new Error(`La orden con id ${id} no existe`)
            await this.collection.update({order_id: id}, data)
            pino.info(`Orden nro. ${id} generada con exito`)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error`)
        }
    }
}