import supertest from 'supertest'
import server from '../server'
import { verifyToken } from '../utils/authToken'

const request = supertest(server)

describe('Test products handler endpoint', () => {
    it("/products to return 200", async () => {
        const response = await request.get('/products')
        expect(response.status).toBe(200)
    })
    it(' POST /product must have auth middleware present', async () => {
        expect(verifyToken).toBeDefined()
    })

})