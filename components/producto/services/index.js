import fs from 'fs'

export class Product {
    constructor(id, stamp, name, desc, code, pic, price, stock){
        this.id = id,
        this.timestamp = stamp,
        this.name = name,
        this.description = desc,
        this.code = code,
        this.price = price,
        this.stock = stock
    }
}
export const list = async ()=>{
    try {
        const file = await fs.promises.readFile('./productos.json')
        const fileObj = JSON.parse(file)
        return fileObj
    } catch (error) {
        throw new Error(`Tuvimos el siguiente problema: ${error}`)
    }
}
export const writeList = async (list)=>{
    try {
        fs.promises.writeFile('./productos.json', list)
    } catch (error) {
        throw new Error(`Tuvimos el siguiente problema: ${error}`)
    }
}
export const newId = (list)=>{
    const newId = list.reduce((previous, actual) => Math.max(previous, actual.id) , 1)
    return newId + 1
}
export const updateProd = (prod, newData)=>{
    prod.name = newData.name
    prod.code = newData.code
    prod.description = newData.description
    prod.price = newData.price
    prod.stock = newData.stock
    prod.picture = newData.picture
    return prod
}


