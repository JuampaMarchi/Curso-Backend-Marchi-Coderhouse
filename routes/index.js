const authApi = require('../components/auth')
const userApi = require('../components/users')
const cartApi = require('../components/cart')
const chatApi = require('../components/chat')
const prodApi = require('../components/products')

module.exports = app => {
    authApi(app)
    userApi(app)
    cartApi(app)
    chatApi(app)
    prodApi(app)

    app.get('/', (req, res) => res.redirect('/auth'))
}