const cluster = require('cluster')

const cluster_mode = (app, cpus, port) => {
    if(cluster.isMaster) {
        console.log(`Running Master Process - PID: ${process.pid}`)

        for (let i = 0; i < cpus; i++) {
            cluster.fork()
        }

        cluster.on('exit', (worker, node, signal) => {
            console.log(`Worker ${worker.process.pid} died`)
        })
    } else {
        app.listen(port, err => {
            console.log(`Process running on http://localhost:${port} - Worker: ${process.pid}`)
        })
    }
}

module.exports = cluster_mode