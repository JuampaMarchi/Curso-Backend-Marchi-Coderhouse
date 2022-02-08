let path = require("path");
let args = process.argv.slice(2);

require("dotenv").config({
    path: args.length > 0 ? path.resolve("prod.env") : path.resolve("dev.env")
});

let config = {
    modo: process.env.MODE,
    puerto: process.env.PORT,
    debug: process.env.DEBUG,
    otros: process.env.OTHER.split(";")
}

console.log(config);