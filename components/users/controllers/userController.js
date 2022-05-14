const userServices = require('../services/userService')
const pino = require('../../../utils/logger/pino')
const mailer = require('../../../utils/nodemailer/nodemailer')
const jwtServices = require('../../../utils/jwt/jwtService')

class UserController {
    //Listar todos los usuarios
    async get(req, res){
        try {
            const response = await userServices.findAll({})
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    //Mostrar usuario con id seleccionado
    async getOne(req, res){
        try {
            const { id } = req.params
            const response = await userServices.findById(id)
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    //Muestra datos de usuario actual
    async getCurrent(req, res){
        try {
            const token = req.cookies.token
            const payload = jwtServices.verify(token)
            const response = await userServices.findOne(id)
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    //Vista para el registro
    async register(req, res){
        try {
            res.status(200).render('register')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async create(req, res){
        try {
            const response = await userServices.create(req.body)
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async update(req, res){
        try {
            const { id } = req.params
            const response = await userServices.update(id, req.body)
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }async delete(req, res){
        try {
            const { id } = req.params
            const response = await userServices.delete(id)
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = new UserController()