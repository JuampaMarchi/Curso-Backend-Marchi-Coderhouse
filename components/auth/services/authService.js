const pino = require('../../../utils/logger/pino')
const JWT = require('../../../utils/jwt/jwtService')
const Bcrypt = require('../../../utils/bcrypt/index')
const UserService = require('../../users/index')
const { config } = require('../../../config')

class AuthService {
    async login(username, password){
        try {
            const exists = await UserService.findByName(username)
            if(!exists) throw new Error('Credenciales invalidas')
            const succes = await Bcrypt.compare(password, exists.password)
            if(!succes) throw new Error('Credenciales invalidas')
            const token = await JWT.generate({id: exists._id})
            const response = {
                exists,
                token,
                type: 'Bearer',
                expires_in: config.expireTimeToken
            }
            return response
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    async verifyToken(token){
        try {
            const verification = await JWT.verify(token)
            if(!verification) throw new Error('Token invalido')
            const payload = await JWT.decode(token)
            const user = await UserService.findById(payload.id)
            if(!user) throw new Error('El token no pertenece a ningun usuario')
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = new AuthService()