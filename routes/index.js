const authApi = require('../components/auth')
const userApi = require('../components/users/')

module.exports = app => {
    authApi(app)
    userApi(app)

    app.get('/', (req, res) => res.send('Hola'))
}