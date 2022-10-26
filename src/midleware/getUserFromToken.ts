import express from 'express'
import jwt from 'jsonwebtoken'
import { CustomRequest } from '../utils/extension'

export const getUserFromToken = (req: CustomRequest, res: express.Response, next: express.NextFunction): void => {
  try {
    const authorization = req.get('authorization') ?? ''
    let token = ''
    var userId = null

    if (authorization !== '' && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7)
      const decodedToken = jwt.verify(token, process.env.NODE_SECRET_JWT as string)

      const { id } = decodedToken as jwt.JwtPayload
      userId = id
    }

    if (token === '' || userId == null) {
      res.status(401).json({ error: 'Token missing or invalid.' })
    } else {
      req.userId = userId

      next()
    }
  } catch (_) {
    res.status(401).json({ error: 'Token missing or invalid.' })
  }
}
