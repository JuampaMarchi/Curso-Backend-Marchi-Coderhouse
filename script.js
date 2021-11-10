const fs = require('fs')

class Contenedor {
    constructor(fileUrl){
        this.url = fileUrl
    }
    read(){
        try {
            return fs.readFileSync(this.url, 'utf-8')
        } catch (error) {
            console.log(`El programa encontró el siguiente error: ${error}`)
        }
    }
    save(obj){
        try {
            const fileObject = JSON.parse(this.read())
            const idCheck = fileObject.some((e)=>{
                e.id === obj.id
            })
            if(idCheck){
                throw new Error(`El id "${obj.id}" se encuentra repetido`)
            }
            fileObject.push(obj)
            fs.writeFileSync(this.url, JSON.stringify(fileObject))
            return `El id asignado fue "${obj.id}"`
        } catch (error) {
            console.log(`El programa encontró el siguiente error: ${error}`)
        }
    }
    getById(id){
        try {
            const fileObject = JSON.parse(this.read())
            const element = fileObject.find(e => e.id === id)
            if(!element){
                return null
            }
            return element
        } catch (error) {
            console.log(`El programa encontró el siguiente error: ${error}`)
        }
    }
    getAll(){
        try {
            return JSON.parse(this.read())
        } catch (error) {
            console.log(`El programa encontró el siguiente error: ${error}`)
        }
    }
    deleteById(id){
        try {
            const fileObject = JSON.parse(this.read())
            const element = fileObject.find(e => e.id === id)
            if(!element){
                throw new Error(`No hay coincidencias con el id: ${id}`)
            }
            fileObject.splice(fileObject.indexOf(element),1)
            fs.writeFileSync(this.url, JSON.stringify(fileObject))
        } catch (error) {
            console.log(`El programa encontró el siguiente error: ${error}`)
        }
    }
    deleteAll(){
        try {
            fs.writeFileSync(this.url, '[]')
        } catch (error) {
            console.log(`El programa encontró el siguiente error: ${error}`)
        }
    }
}
let container = new Contenedor('./productos.json')
// let newProd = {
//     "name": "producto4",
//     "price": 40,
//     "id": 4
// }
// console.log(container.read())
// container.save(newProd)
// console.log(container.read())

// console.log(container.getById(3))
// console.log(container.getById(5))
// console.log(container.getById(2))

//console.log(container.getAll())

//container.deleteById(4)








