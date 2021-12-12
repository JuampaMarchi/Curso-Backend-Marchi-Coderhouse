export const userAuth = (req, res, next)=>{
    const {admin} = req.query
    if(admin === "true"){
        console.log('Administrador Validado')
        next()
    } else {
        const result = { error : -1, descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada` }
        res.status(403).send(result)
    }
}