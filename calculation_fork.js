process.on('message', data => {
    console.log(data)
    let response = countNumbers({}, data.num)
    process.send(response)
})
function randomNum(){
    return Math.round(Math.random() * 1000)
}   

function countNumbers(obj, iter){
    for (let i = 0; i < iter; i++) {
        let res = randomNum()
        if(!obj[res]){
            obj[res] = 1
        } else {
            obj[res] += 1
        }
    }
    return obj
}
