const authApi = require('../components/auth')
const userApi = require('../components/users')
const cartApi = require('../components/cart')
const chatApi = require('../components/chat')

module.exports = app => {
    authApi(app)
    userApi(app)
    cartApi(app)
    chatApi(app)

    app.get('/', (req, res) => res.send('Hola'))
    app.get('/register', (req, res) => res.render('register'))
}