import fs from 'fs'
import path from 'path'

export const list = async ()=>{
        const file = await fs.promises.readFile('./productos.json')
        const fileObj = JSON.parse(file)
        return fileObj
    }
