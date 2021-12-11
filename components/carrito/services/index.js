import fs from 'fs'

export class Carrito {
    constructor(id, stamp){
        this.id = id,
        this.timestamp = stamp,
        this.products = []
    }
}
export const bringCart = async ()=>{
    try {
        const cart = await fs.promises.readFile('./cart.json')
        const cartObj = JSON.parse(cart)
        return cartObj
    } catch (error) {
        throw new Error(`Tuvimos el siguiente problema: ${error}`)
    }
}
export const newId = (list)=>{
    const newId = list.reduce((previous, actual) => Math.max(previous, actual.id) , 1)
    return newId + 1
}