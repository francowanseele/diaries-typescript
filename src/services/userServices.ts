import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { UserEntry, NonSensitiveInfoUserEntry, NewUserEntry, LoginUserEntry } from '../types'
import userData from './users.json'
import userDataQA from './users_qa.json'

const { NODE_ENV } = process.env
const users: UserEntry[] = NODE_ENV === 'dev' ? userData as UserEntry[] : userDataQA as UserEntry[]

export const getEntries = (): UserEntry[] => users

export const findById = (id: number): NonSensitiveInfoUserEntry | undefined => {
  const entry = users.find(d => d.id === id)
  if (entry != null) {
    const { password, ...restOfDiary } = entry
    return restOfDiary
  }

  return undefined
}

export const findByEmail = (email: string): UserEntry | undefined => {
  return users.find(d => d.email === email)
}

export const getEntriesWithoutSensitiveInfo = (): NonSensitiveInfoUserEntry[] => {
  return users.map(({ id, name, lastname, email }) => {
    return {
      id,
      name,
      lastname,
      email
    }
  })
}

export const addUser = async (newUserEntry: NewUserEntry): Promise<UserEntry> => {
  const saltRounds = process.env.NODE_BCRYPT_SALT_ROUNTDS ?? 10

  const passwordHash = await bcrypt.hash(newUserEntry.password, +saltRounds)

  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(d => d.id)) + 1 : 1,
    name: newUserEntry.name,
    lastname: newUserEntry.lastname,
    email: newUserEntry.email,
    password: passwordHash
  }

  users.push(newUser)
  return newUser
}

export const deleteAllUsers = (): UserEntry[] => {
  users.splice(0, users.length)

  return users
}

export const getToken = async (userEntry: LoginUserEntry, user: UserEntry | undefined): Promise<string> => {
  const passwordCorrect: boolean = user == null
    ? false
    : await bcrypt.compare(userEntry.password, user.password)

  if (!passwordCorrect) {
    return ''
  }

  const userForToken = {
    id: (user as UserEntry).id,
    email: (user as UserEntry).email
  }

  return jwt.sign(
    userForToken,
    process.env.NODE_SECRET_JWT as string,
    {
      expiresIn: 60 * 60 * 24 * 7
    }
  )
}
