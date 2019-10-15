import request from 'supertest'
import app from '../../src/app'

import factory from '../factories'

import truncate from '../util/truncate'

describe('Session store', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('Should be possible create a session with a existent user', async () => {
    const user = await factory.create('User', {
      password: '123456789',
    })

    const response = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: '123456789' })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  it('Should be not possible create a session with a unxistent user', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ email: 'test@email.com', password: '12345678' })

    expect(response.status).toBe(401)
    expect(response.body.message).toBe(
      'User with email test@email.com not found.'
    )
  })

  it('Should be not possible create a session with a wrong password', async () => {
    const user = await factory.attrs('User')

    await request(app)
      .post('/users')
      .send(user)

    const response = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: 'wrongpassword' })

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Password does not match.')
  })

  it('Should be not possible create a session without mail and password', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({})

    expect(response.status).toBe(400)
    expect(response.body.message).toBe(
      'Validation failed, there are missing or wrong parameters.'
    )
  })
})
