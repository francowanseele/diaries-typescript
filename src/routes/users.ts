import express, { RequestHandler } from 'express'
import { addUser, deleteAllUsers, getAllUsers, getUser, login } from '../controllers/users'

const router = express.Router()

router.get('/', getAllUsers)

router.get('/:id', getUser)

router.post('/', addUser as express.RequestHandler)

router.delete('/', deleteAllUsers)

router.post('/login', login as RequestHandler)

export default router
