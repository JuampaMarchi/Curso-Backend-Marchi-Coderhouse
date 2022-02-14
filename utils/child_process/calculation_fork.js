const randomNum = () => Math.round(Math.random() * 1000)  

const countNumbers = (obj, iter) => {
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

process.on('message', data => {
    console.log(data)
    let response = countNumbers({}, data)
    process.send(response)
})