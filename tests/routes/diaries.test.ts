import supertest from 'supertest'
import { app, server } from '../../src/index'

const api = supertest(app)

describe('Test routes diaries', () => {
  // beforeEach(async () => {

  // })

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

    expect(newDiary.body.comment).toBe('new comment')
    const response = await api.get('/api/diaries')
    expect(response.body).toHaveLength(1)
  })

  it('Should be remove all diaries.', async () => {
    const response = await api.delete('/api/diaries')
      .expect(200)
    console.log(response.body)

    expect(response.body).toHaveLength(0)
  })

  afterAll(() => {
    server.close()
  })
})
