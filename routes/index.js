const authApi = require('../components/auth')

module.exports = app => {
    authApi(app)

    app.get('/', (req, res) => res.send('Hola'))
}