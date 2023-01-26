import supertest from 'supertest'
import server from '../server'

const request = supertest(server)

describe('Test users handler endpoint', () => {
    it("/users to return 200", async () => {
        const response = await request.get('/users')
        expect(response.status).toBe(200)
    })
    it('/user/:id => return 401 without token', async () => {
        const response = await request.get('/user/:id')
        expect(response.unauthorized).toBe(true)
    })
    it('/user post', async () => {
        const response = await request.get('/users')
        expect(response.status).toBe(200)
    })
})