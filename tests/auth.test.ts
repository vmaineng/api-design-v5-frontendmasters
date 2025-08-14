import request from 'supertest'
import app from '../src/server.ts'
import env from '../env.ts'
import {
  createTestHabit,
  cleanupDatabase,
  createTestUser,
} from './setup/dbHelpers.ts'
import { create } from 'domain'

describe('Authentication endpoints', () => {
  //test suites - place holder for your tests but not actual tests
  afterEach(async () => {
    await cleanupDatabase()
  })
  describe('POST /api/auth/register', () => {
    it('should register a new user with valid data', async () => {
      const user = await createTestUser()
      const response = await request(app)
    })
  })

  describe('POST /api/auth/login', () => {
    it('should log in with valid credentials', async () => {
      const testUser = await createTestUser()
      const credentials = {
        email: testUser.user.email,
        password: testUser.rawPassword,
      }
      const response = (await request(app).post('/api/auth/login'))
        .send(credentials)
        .expect(201)

        expect (response.body).toHaveBeenCalled()
        expect(response.body)toHaveProperty('user')
    })
  })
})
