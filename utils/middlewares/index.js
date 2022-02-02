export const isAuth = (req, res, next) => {
    
    if(req.isAuthenticated()) return next()

    res.redirect('error')
}

export const isNotAuth = (req, res, next) => {

    if(!req.isAuthenticated()) return next()

    res.redirect('error')
}