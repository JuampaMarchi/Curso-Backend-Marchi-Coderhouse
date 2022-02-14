
let express = require("express");
let cluster = require('cluster');
let numCPU = require('os').cpus().length;
let app = express();
let args = process.argv.slice(2);
let PORT = 8080;

app.get("/", (req, res, next)=>{
    res.send(`Servidor en puerto ${PORT}`);
});

app.listen(PORT, ()=>{
    console.log(`Server On! http://localhost:${PORT}`);
});