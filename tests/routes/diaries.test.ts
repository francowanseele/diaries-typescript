import supertest from 'supertest'
import { app, server } from '../../src/index'

const api = supertest(app)

var TOKEN = ''

describe('Test routes diaries', () => {
  // beforeEach(async () => {

  // })

  beforeAll(async () => {
    const name = 'user'
    const lastname = 'example'
    const email = 'user.example@gmail.com'
    const password = '123456'

    await api.post('/api/users')
      .send({
        name: name,
        lastname: lastname,
        email: email,
        password: password
      })

    const logged = await api.post('/api/users/login')
      .send({
        email: email,
        password: password
      })

    TOKEN = logged.body.token
  })

  it('Diaries should to be a json file.', async () => {
    await api
      .get('/api/diaries')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  it('Number of diaries should to be 0.', async () => {
    const response = await api.get('/api/diaries')
    expect(response.body).toHaveLength(0)
  })

  it('Should add new diary.', async () => {
    const newDiary = await api.post('/api/diaries')
      .send({
        comment: 'new comment',
        date: '2022-01-01',
        weather: 'sunny',
        visibility: 'ok'
      })
      .set('Authorization', `Bearer ${TOKEN}`)

    expect(newDiary.body.comment).toBe('new comment')
    const response = await api.get('/api/diaries')
    expect(response.body).toHaveLength(1)
  })

  it('Should be remove all diaries.', async () => {
    const response = await api.delete('/api/diaries')
      .set('Authorization', `Bearer ${TOKEN}`)
      .expect(200)

    expect(response.body).toHaveLength(0)
  })

  afterAll(() => {
    server.close()
  })
})
