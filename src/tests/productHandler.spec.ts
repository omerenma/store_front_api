import supertest from 'supertest'
import server from '../server'

const request = supertest(server)
const mockedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxMTcsImZpcnN0bmFtZSI6Ik5ldmVyIGV4cGlyZXMiLCJsYXN0bmFtZSI6Ik5ldmVyIGV4cGlyZXMgbGFzdG5hbWUiLCJwYXNzd29yZCI6IiQyYiQxMCRaZFhrMzVNRDhFSVNXTU5QTml4T3EuNjIyb1ZYOXpsdWl5RHdKQUQ2Zmc3YjJUcW83NHdjTyJ9LCJpYXQiOjE2NzUxNzc0MTYsImV4cCI6MzE3MjE5NjE5ODE2fQ.PLkLL4KQnC3boA-3SUDGtVqNZimayZKSMFyIPEFAoXM'
const mockedId = 2
describe('Test products handler endpoint', () => {
    it(' POST /product must have auth middleware to add products', async () => {
       const response = await request.post('/product').set('Authorization', `Bearer ${mockedToken}`).send({name:'Testing Products 1', price:1000000})
       expect((await response).status).toBe(200)
    })
    it("/products to return 200", async () => {
        const response = await request.get('/products')
        expect(response.status).toBe(200)
    })
})