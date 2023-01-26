import supertest from 'supertest'
import server from '../server'

const request = supertest(server)

describe('Test products handler endpoint', () => {
    it("/products to return 200", async () => {
        const response = await request.get('/products')
        expect(response.status).toBe(200)
    })
    it('/products/:id => return 401 without token', async () => {
        const response = await request.get('/products/:id')
        expect(response.unauthorized).toBe(true)
    })

})