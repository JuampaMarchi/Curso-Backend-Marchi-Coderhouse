import { Router } from "express";
import { Users } from "../components/users/index.js"

export const rootRouter = new Router()

rootRouter.get('/', (req, res, next) => {
    if(req.session.user_name) return res.redirect('main')
    res.render('log_in')
})

rootRouter.get('/main', (req, res, next) => {
    let user = {name: 'Usuario/a'}
    if(req.session.user) user.name = req.session.user.user_name
    req.session.touch()
    res.render('main', {user})
})

rootRouter.get('/log_out', (req, res, next) => {
    if(!req.session.user) return res.send('Sesion Expirada')
    let name = req.session.user.user_name
    req.session.destroy( err => {
        if(err) return res.json({Erro: JSON.stringify(err)})
        res.send(`Hasta luego ${name}!`)
    })
})

rootRouter.get('/register', (req, res, next) => {
    res.render('register')
})

rootRouter.post('/', async (req, res, next) => {
    const { username, password } = req.body
    const user = await Users.findByName(username)
    if(user) {
        if(user.password == password){
            req.session.user = user
            return res.redirect('main')
        } else {
            return res.send('Usuario y/o contraseña invalidos')
        }
    }
    res.send(`No se encontro usuario`)
})