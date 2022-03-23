const isAuth = (req, res, next) => {
    
    if(req.isAuthenticated()) return next()

    res.redirect('error')
}

const isNotAuth = (req, res, next) => {

    if(!req.isAuthenticated()) return next()

    res.redirect('error')
}

module.exports = { isAuth, isNotAuth }