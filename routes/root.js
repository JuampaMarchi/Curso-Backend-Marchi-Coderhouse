const passport = require('passport')
const { Router } = require('express')
const middlewares = require('../utils/middlewares/index')

const rootRouter = new Router()

rootRouter.get('/', (req, res, next) => {
    if(req.session.user_name) return res.redirect('main')
    res.render('log_in')
})

rootRouter.get('/main', middlewares.isAuth, (req, res, next) => {
    let user = req.user
    let products = [{id: '1', name: 'producto 1', price: 100}, {id: '2', name: 'producto 2', price: 200}]
    req.session.touch()
    res.render('main', {user, products})
})

rootRouter.get('/log_out', (req, res, next) => {
    let user = req.user
    if(!user) return res.send('Sesion Expirada')
    req.session.destroy( err => {
        if(err) return res.json({Erro: JSON.stringify(err)})
        res.render('logout', {user})
    })
})

rootRouter.get('/register', (req, res, next) => {
    res.render('register')
})

rootRouter.get('/error', (req, res, next) => {
    res.render('error')
})

rootRouter.post('/register', passport.authenticate('register', {failureRedirect: 'error', successRedirect: 'main'}))

rootRouter.post('/', passport.authenticate('login', {failureRedirect: 'error', successRedirect: 'main'}))

module.exports = rootRouter