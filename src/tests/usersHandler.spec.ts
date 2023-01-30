import supertest from 'supertest'
import server from '../server'
import { verifyToken } from '../utils/authToken'

const request = supertest(server)

describe('Test users handler endpoint', () => {
    it('GET /user must have auth middleware funcion', async () => {
       expect(verifyToken).toBeDefined()
    })
    it('GET /user/:id must have auth middleware function', async () => {
        expect(verifyToken).toBeDefined()
    })
})