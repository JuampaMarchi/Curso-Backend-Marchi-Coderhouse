let path = require("path");
let yarg = require("yargs");
let options = {
    default:{
        env: "prod"
    }
}
const procArgv = yarg(process.argv.slice(2));
const argsRes = procArgv.alias(options.default).argv;
console.log(argsRes, path.resolve("prod.env"));
require("dotenv").config({
    path: argsRes.env == "prod" ? path.resolve("prod.env") : path.resolve("dev.env")
});
let config = {
    fondo: process.env.FONDO,
    frente: process.env.FRENTE,
    port: process.env.PORT
}

module.exports = {
    config
}