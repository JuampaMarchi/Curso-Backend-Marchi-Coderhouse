import passport from "passport";
import { Strategy } from "passport-local";
import { Users } from "../../components/users/index.js";
import { checkValue } from "../bcrypt/index.js";

export const loginStrategy = () => {
    passport.use('login', new Strategy( async (username, password, done) => {
        const user = await Users.findByName(username)
    
        if(!user) return done(null, false)
    
        if(!checkValue()) return done(null, false)
    
        return done(null, user)
    }))
}

export const registerStrategy = () => {
    passport.use('register', new Strategy({
        passReqToCallback: true
    }, async (username, password, done) => {
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