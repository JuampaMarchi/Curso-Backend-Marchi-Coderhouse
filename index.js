let express = require("express");
let cluster = require('cluster')
let numCPU = require('os').cpus().length
let app = express();
let args = process.argv.slice(2)
let PORT = 8080

const isNum = num => !isNaN(num)

if(args > 0){
    if(isNum(args[0])) PORT = Number(args[0])
}

if(cluster.isMaster){
    console.log(`Master PID: ${process.pid}`)

    //WORKERS
    for (let i = 0; i < numCPU; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Murio el subproceso: ${worker.process.pid}`)
        cluster.fork();
    })
} else {
    app.listen(PORT, ()=>{
        console.log(`Server On! http://localhost:${PORT} || Worker PID: ${process.pid} - FH; ${new Date()}`)
    })
}

app.get("/", (req, res, next)=>{
    res.send(`Servidor en puerto ${PORT}, - PID: ${process.pid} - FH; ${new Date()}`);
    cluster.worker.kill()
})

