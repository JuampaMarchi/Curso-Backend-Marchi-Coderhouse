const authApi = require('../components/auth')
const userApi = require('../components/users/')
const cartApi = require('../components/cart')

module.exports = app => {
    authApi(app)
    userApi(app)
    cartApi(app)

    app.get('/', (req, res) => res.send('Hola'))
}