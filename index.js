
let { config } = require("./config");
let express = require("express");
let app = express();
const PORT = config.port;

app.get("/", (req, res, next)=>{
    res.send(`Mi fondo es de color ${config.fondo} y el frente d emi casa es de color ${config.frente}`);
})

app.listen(PORT, ()=>{
    console.log(`Server On! http://localhost:${PORT}`)
})