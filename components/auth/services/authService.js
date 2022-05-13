const pino = require('../../../utils/logger/pino')
const JWT = require('../../../utils/jwt/jwtService')
const Bcrypt = require('../../../utils/bcrypt/index')
const UserService = require('../../users/services/userService')
const { config } = require('../../../config')

class AuthService {
    async login(username, password){
        try {
            const user = await UserService.findByName(username) 
            if(!user) throw new Error('Credenciales invalidas')
            const succes = await Bcrypt.compare(password, user.password)
            if(!succes) throw new Error('Credenciales invalidas')
            const token = await JWT.generate({id: user._id, name: user.name, email: user.email, role: user.role})     //Carga de datos de usuario en el payload
            const response = {
                user,
                token,
                type: 'Bearer',
                expires_in: config.expireTimeToken
            }
            return response
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
    //Verificacion de Token, devuelve Payload
    async verifyToken(token){
        try {
            const verification = await JWT.verify(token)
            if(!verification) throw new Error('Token invalido')
            const payload = await JWT.decode(token)
            const user = await UserService.findById(payload.id)
            if(!user) throw new Error('El token no pertenece a ningun usuario')
            return payload
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = new AuthService()