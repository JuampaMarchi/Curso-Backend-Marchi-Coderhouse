const updateCookie = (req, res, next) => {
    req.session.touch()
}