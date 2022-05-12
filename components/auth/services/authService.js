

class AuthService {
    async loginController(req, res){
        try {
            const { username, password } = req.body
            const response = await ;
            res.status(200).json(response)
        } catch (error) {
            pino.error(`Tuvimos el siguiente error: ${error}`)
        }
    }
}

module.exports = new AuthService()