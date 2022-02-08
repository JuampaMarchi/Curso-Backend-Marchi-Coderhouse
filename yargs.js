let yarg = require("yargs");
let options = {
    alias:{
        m: "modo",
        p: "puerto",
        d: "debug"
    }
}
const procArgv = yarg(process.argv.slice(2));
const argsRes = procArgv.alias(options.alias).argv;
argsRes.otros = argsRes._;
delete argsRes.m;
delete argsRes.p;
delete argsRes.d;
delete argsRes._;
delete argsRes['$0'];
console.log(argsRes);