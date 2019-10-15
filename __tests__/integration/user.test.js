import request from 'supertest'
import bcrypt from 'bcryptjs'
import app from '../../src/app'

import factory from '../factories'

import truncate from '../util/truncate'

describe('User store', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('Should encrypt user password when new user is created', async () => {
    const user = await factory.create('User', {
      password: '123456789',
    })

    const compareHash = await bcrypt.compare('123456789', user.password_hash)

    expect(compareHash).toBe(true)
  })

  it('Should register a new user', async () => {
    const user = await factory.attrs('User')

    const response = await request(app)
      .post('/users')
      .send(user)

    expect(response.body).toHaveProperty('id')
  })

  it('Should be not possible register duplicated emails, must return status 400', async () => {
    const user = await factory.attrs('User')

    await request(app)
      .post('/users')
      .send(user)

    const response = await request(app)
      .post('/users')
      .send(user)

    expect(response.status).toBe(400)
  })

  it('Should be not possible register user with email without @, must return status 400', async () => {
    const user = await factory.attrs('User', {
      email: 'thisisnotavalidemail.com',
    })

    const response = await request(app)
      .post('/users')
      .send(user)

    expect(response.status).toBe(400)
  })

  it('Should be not possible register a user with a password shorter than 8 characteres, must return status 400', async () => {
    const user = await factory.attrs('User', {
      password: '1234567',
    })

    const response = await request(app)
      .post('/users')
      .send(user)

    expect(response.status).toBe(400)
  })

  it('Should be not possible register a user without name, must return status 400', async () => {
    const user = await factory.attrs('User', {
      email: '',
    })

    const response = await request(app)
      .post('/users')
      .send(user)

    expect(response.status).toBe(400)
  })

  it('Should be not possible register a user without email, must return status 400', async () => {
    const user = await factory.attrs('User', {
      email: '',
    })

    const response = await request(app)
      .post('/users')
      .send(user)

    expect(response.status).toBe(400)
  })

  it('Should be not possible register a user without password, must return status 400', async () => {
    const user = await factory.attrs('User', {
      password: '',
    })

    const response = await request(app)
      .post('/users')
      .send(user)

    expect(response.status).toBe(400)
  })
})

describe('User update', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('Should be possible update the name of an existent user', async () => {
    const user = await factory.attrs('User')

    await request(app)
      .post('/users')
      .send(user)

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password })

    const response = await request(app)
      .put('/users')
      .send({ name: 'New User Name', email: user.email })
      .set('Authorization', `Bearer ${sessionData.token}`)

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('New User Name')
  })

  it('Should be possible update the email of an existent user', async () => {
    const user = await factory.attrs('User')

    await request(app)
      .post('/users')
      .send(user)

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password })

    const response = await request(app)
      .put('/users')
      .send({ email: 'newemail@test.com', name: user.name })
      .set('Authorization', `Bearer ${sessionData.token}`)

    expect(response.status).toBe(200)
    expect(response.body.email).toBe('newemail@test.com')
  })

  it('Should be possible update the password of an existent user', async () => {
    const user = await factory.attrs('User')

    await request(app)
      .post('/users')
      .send(user)

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password })

    const response = await request(app)
      .put('/users')
      .send({
        name: user.name,
        email: user.email,
        oldPassword: user.password,
        password: '12345678',
        passwordConfirmation: '12345678',
      })
      .set('Authorization', `Bearer ${sessionData.token}`)

    expect(response.status).toBe(200)
  })

  it('Should be not possible update an user with a wrong email', async () => {
    const user = await factory.attrs('User')

    await request(app)
      .post('/users')
      .send(user)

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password })

    const response = await request(app)
      .put('/users')
      .send({ email: 'thatisnotanvalidemail' })
      .set('Authorization', `Bearer ${sessionData.token}`)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe(
      'Validation failed, there are missing or wrong parameters.'
    )
  })

  it('Should be not possible update an user with a new password shorter than 8 characters', async () => {
    const user = await factory.attrs('User')

    await request(app)
      .post('/users')
      .send(user)

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password })

    const response = await request(app)
      .put('/users')
      .send({
        oldPassword: user.password,
        password: '1234567',
        passwordConfirmation: '1234567',
      })
      .set('Authorization', `Bearer ${sessionData.token}`)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe(
      'Validation failed, there are missing or wrong parameters.'
    )
  })

  it('Should be not possible update an user with a wrong old password', async () => {
    const user = await factory.attrs('User')

    await request(app)
      .post('/users')
      .send(user)

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password })

    const response = await request(app)
      .put('/users')
      .send({
        name: user.name,
        email: user.email,
        oldPassword: 'wrongoldpassword',
        password: '12345678',
        passwordConfirmation: '12345678',
      })
      .set('Authorization', `Bearer ${sessionData.token}`)

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Old password does not match.')
  })

  it('Should be not possible update the email of an existent user with a registered email', async () => {
    const registeredUser = await factory.attrs('User', {
      email: 'alreadyregistered@email.com',
    })
    const user = await factory.attrs('User')

    await request(app)
      .post('/users')
      .send(user)

    await request(app)
      .post('/users')
      .send(registeredUser)

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password })

    const response = await request(app)
      .put('/users')
      .send({ email: registeredUser.email, name: 'New Name' })
      .set('Authorization', `Bearer ${sessionData.token}`)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('User with that email already exists.')
  })

  it('Should be not possible update an user with wrong password confirmation.', async () => {
    const user = await factory.attrs('User')

    await request(app)
      .post('/users')
      .send(user)

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password })

    const response = await request(app)
      .put('/users')
      .send({
        oldPassword: user.password,
        password: '123456789',
        passwordConfirmation: '12345678',
      })
      .set('Authorization', `Bearer ${sessionData.token}`)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe(
      'Validation failed, there are missing or wrong parameters.'
    )
  })
})
