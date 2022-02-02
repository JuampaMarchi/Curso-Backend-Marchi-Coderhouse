import passport from "passport";
import { Router } from "express";
import { Users } from "../components/users/index.js"
import { isAuth, isNotAuth } from "../utils/middlewares/index.js";

export const rootRouter = new Router()

rootRouter.get('/', (req, res, next) => {
    if(req.session.user_name) return res.redirect('main')
    res.render('log_in')
})

rootRouter.get('/main', isAuth, (req, res, next) => {
    let user = req.user
    req.session.touch()
    res.render('main', {user})
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
    // const { username, password } = req.body
    // const user = await Users.findByName(username)
    // if(user) {
    //     if(user.password == password){
    //         req.session.user = user
    //         return res.redirect('main')
    //     } else {
    //         return res.send('Usuario y/o contraseña invalidos')
    //     }
    // }
    // res.send(`No se encontro usuario`)
// })