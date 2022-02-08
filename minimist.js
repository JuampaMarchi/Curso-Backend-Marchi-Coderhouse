let minimist = require("minimist");

console.log(process.argv);
console.log("--------------------");
// default:{
//     modo: 'dev',
//     puerto: 8080,
//     debug: true,
//     otros: [1,2,3]
// },
let options = {
    alias:{
        m: "modo",
        p: "puerto",
        d: "debug"
    }
}

let argv = minimist(process.argv.slice(2), options);
argv.otros = argv._;
delete argv.m;
delete argv.p;
delete argv.d;
delete argv._;
console.log(argv);
// node minimist.js 1 2 3 -m dev -p 8080 -d