// const { Router } = require('express')

// const rootRouter = new Router()

// rootRouter.get('/', (req, res, next) => {
//     res.redirect('main')
// })

// rootRouter.get('/main', (req, res, next) => {
//     let user = 'Usuario'
//     let products = [{id: '1', name: 'producto 1', price: 100}, {id: '2', name: 'producto 2', price: 200},{id: '3', name: 'producto 3', price: 300},{id: '4', name: 'producto 4', price: 400},{id: '5', name: 'producto 5', price: 500}]
//     res.render('main', {user, products})
// })

// rootRouter.get('/log_out', (req, res, next) => {
//     let user = 'Usuario'
//     if(!user) return res.send('Sesion Expirada')

// })

// rootRouter.get('/register', (req, res, next) => {
//     res.render('register')
// })

// rootRouter.get('/error', (req, res, next) => {
//     res.render('error')
// })

// // rootRouter.post('/register', passport.authenticate('register', {failureRedirect: 'error', successRedirect: 'main'}))

// // rootRouter.post('/', passport.authenticate('login', {failureRedirect: 'error', successRedirect: 'main'}))

// module.exports = rootRouter