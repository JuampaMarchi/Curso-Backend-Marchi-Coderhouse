const passport = require('passport')
const { Strategy } = require('passport-local')
const { Users } = require('../../components/users/index')
const { checkValue } = require('../bcrypt/index')

const loginStrategy = () => {
    passport.use('login', new Strategy( async (username, password, done) => {
        
        const user = await Users.findByName(username)

        if(!user) return done(null, false)
    
        if(!checkValue(password, user.password)) return done(null, false)

        return done(null, user)
    }))
}

const registerStrategy = () => {
    passport.use('register', new Strategy({
        passReqToCallback: true
    }, async (req, username, password, done) => {
        
        const findUser = await Users.findByName(username)
    
        if(findUser) return done('Usuario ya registrado')
        
        const user = {
            username,
            password
        }
        await Users.insert(user)
    
        return done(null, user)
    }))
}

const serialize = () => passport.serializeUser((user, done) => done(null, user.username))

const deserialize = () => passport.deserializeUser(async (username, done) => {
    let user = await Users.findByName(username)
    done(null, user)
})

module.exports = { loginStrategy, registerStrategy, serialize, deserialize }