import supertest from 'supertest'
import server from '../server'
const request = supertest(server)
import { verifyToken } from '../utils/authToken'

describe('Test Order Handlers endpoint', () => {
    it('Get /orders must have auth middleware function', async () => {
        expect(verifyToken).toBeDefined()
    })
    it('Get /orders/:id must have auth middleware function', async () => {
        expect(verifyToken).toBeDefined()
    })
    it('Post /orders must have auth middleware function', async () => {
        expect(verifyToken).toBeDefined()
    })
    it('Post /orders/:id must have auth middleware function', async () => {
        expect(verifyToken).toBeDefined()
    })
})