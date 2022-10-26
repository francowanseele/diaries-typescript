import express from 'express'

import * as userServices from '../services/userServices'
import { toLoginUserEntry, toNewUserEntry } from '../utils/users'
import { UserEntry } from '../types'

export const getAllUsers = (_req: express.Request, res: express.Response): void => {
  res.send(userServices.getEntriesWithoutSensitiveInfo())
}

export const getUser = (req: express.Request, res: express.Response): void => {
  const user = userServices.findById(+req.params.id)

  user != null
    ? res.send(user)
    : res.sendStatus(404)
}

export const login = async (req: express.Request, res: express.Response): Promise<void> => {
  const loginUserEntry = toLoginUserEntry(req.body)

  const user = userServices.findByEmail(loginUserEntry.email)

  const token = await userServices.getToken(loginUserEntry, user)

  if (token === '') {
    res.status(401).json({
      error: 'Invalid user or password.'
    })
  } else {
    res.send({
      email: (user as UserEntry).email,
      token
    })
  }
}

export const addUser = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const newUserEntry = toNewUserEntry(req.body)
    const addedUserEntry = await userServices.addUser(newUserEntry)

    res.status(200).send(addedUserEntry)
  } catch (error: any) {
    res.status(400).send(error.message)
  }
}

export const deleteAllUsers = (_req: express.Request, res: express.Response): void => {
  try {
    const users = userServices.deleteAllUsers()

    res.json(users)
  } catch (error: any) {
    res.status(400).send(error.message)
  }
}
