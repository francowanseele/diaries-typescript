import { LoginUserEntry, NewUserEntry } from '../types'
import { isString } from '../utils'

const parseString = (stringFromRequest: any): string => {
  if (!isString(stringFromRequest)) {
    throw new Error('Incorrect or missing string')
  }
  return stringFromRequest
}

export const toNewUserEntry = (object: any): NewUserEntry => {
  const newEntry: NewUserEntry = {
    name: parseString(object.name),
    lastname: parseString(object.lastname),
    email: parseString(object.email),
    password: parseString(object.password)
  }
  return newEntry
}

export const toLoginUserEntry = (object: any): LoginUserEntry => {
  const loginUser: LoginUserEntry = {
    email: parseString(object.email),
    password: parseString(object.password)
  }
  return loginUser
}
