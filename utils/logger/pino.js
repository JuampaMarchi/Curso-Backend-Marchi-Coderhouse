const pino = require("pino")({
    transport: {
        targets: [
            {
                level: 'error',
                target: 'pino/file',
                options: { destination: './utils/logger/logs/error.log', mkdir: true }
            },
            {
                target: 'pino-pretty',
                options: { translateTime: "SYS:dd-mm-yyyy HH:MM:ss" }
            }
        ]
    }
})

module.exports = pino

