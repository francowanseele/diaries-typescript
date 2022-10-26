import express from 'express'
import * as dotenv from 'dotenv'

import diaryRouter from './routes/diaries'
import userRouter from './routes/users'

const app = express()
app.use(express.json()) // middleware -> transform req.body to json

const PORT = 3000

app.get('/ping', (_req, res) => {
  res.send('pong')
})

app.use('/api/diaries', diaryRouter)
app.use('/api/users', userRouter)

dotenv.config()

const server = app.listen(PORT, () => {
  console.log('-----------------------')
  console.log('------- SERVER --------')
  console.log('-----------------------')

  console.log(`http://localhost:${PORT}/api/`)
})

export { app, server }
