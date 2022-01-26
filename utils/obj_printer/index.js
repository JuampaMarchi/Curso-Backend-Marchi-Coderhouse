import { inspect } from 'util'

export const printObj = (obj) => {
    console.log(inspect(obj, false, 10, true))
}