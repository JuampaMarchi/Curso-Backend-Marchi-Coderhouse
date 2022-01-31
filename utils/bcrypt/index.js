import bcrypt from 'bcrypt'

export const encrypt = (value) => bcrypt.hashSync(value, 10)

export const checkValue = (value, encValue) => bcrypt.compare(value, encValue)