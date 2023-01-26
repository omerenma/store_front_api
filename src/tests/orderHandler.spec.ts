import supertest from 'supertest'
import server from '../server'
const request = supertest(server)

describe('Test Order Handlers endpoint', () => {
    it("/orders to return 200",  async() => {
       const response = await request.get('/orders')
       expect(response.status).toBe(200)
    })
    it('/order/:id => return 401 without token', async () => {
        const response = await request.get('/orders/:id')
        expect(response.unauthorized).toBe(true)
    })
})