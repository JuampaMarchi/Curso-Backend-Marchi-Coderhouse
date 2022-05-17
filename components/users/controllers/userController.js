const userServices = require('../services/userService')
const pino = require('../../../utils/logger/pino')
const mailer = require('../../../utils/nodemailer')
const authServices = require('../../auth/services/authService')

class UserController {
    //Listar todos los usuarios
    async get(req, res){
        try {
            const token = req.cookies.token
            const payload = await authServices.verifyToken(token)
            if(!payload || payload.role != 'admin') return res.status(401).render('error-auth')
            const response = await userServices.findAll({})
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    //Retorna datos de usuario con id seleccionado
    async getOne(req, res){
        try {
            const token = req.cookies.token
            const payload = await authServices.verifyToken(token)
            if(!payload || payload.role != 'admin') return res.status(401).render('error-auth')
            const { id } = req.params
            const response = await userServices.findById(id)
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    //Muestra datos de usuario actual
    async getCurrent(req, res){
        try {
            const token = req.cookies.token
            const payload = await authServices.verifyToken(token)
            if(!payload) return res.status(401).render('error-auth')
            const response = await userServices.findOne(payload.id)
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    //Vista para el registro
    async register(req, res){
        try {
            res.status(200).render('register')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    //Funcion de registro
    async create(req, res){
        try {
            const response = await userServices.create(req.body)
            mailer.registerAlert(req.body)
            mailer.registerAlertAdmin(req.body)
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
    //Controlador para actualizar usuario, solo disponible a administradores
    async update(req, res){
        try {
            const token = req.cookies.token
            const payload = await authServices.verifyToken(token)
            if(!payload || payload.role != 'admin') return res.status(401).render('error-auth')
            const { id } = req.params
            const response = await userServices.update(id, req.body)
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    //Controlador para borrar usuario, solo disponible a administradores
    }async delete(req, res){
        try {
            const token = req.cookies.token
            const payload = await authServices.verifyToken(token)
            if(!payload || payload.role != 'admin') return res.status(401).render('error-auth')
            const { id } = req.params
            const response = await userServices.delete(id)
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
            res.status(400).render('error')
        }
    }
}

module.exports = new UserController()