import express from 'express'

import diaryRouter from './routes/diaries'

const app = express()
app.use(express.json()) // middleware -> transform req.body to json

const PORT = 3000

app.get('/ping', (_req, res) => {
  res.send('pong')
})

app.use('/api/diaries', diaryRouter)

app.listen(PORT, () => {
  console.log('-----------------------')
  console.log('------- SERVER --------')
  console.log('-----------------------')

  console.log(`http://localhost:${PORT}/api/`)
})
