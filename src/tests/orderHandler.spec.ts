import supertest from 'supertest'
import server from '../server'



const request = supertest(server)
const mockedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxMTcsImZpcnN0bmFtZSI6Ik5ldmVyIGV4cGlyZXMiLCJsYXN0bmFtZSI6Ik5ldmVyIGV4cGlyZXMgbGFzdG5hbWUiLCJwYXNzd29yZCI6IiQyYiQxMCRaZFhrMzVNRDhFSVNXTU5QTml4T3EuNjIyb1ZYOXpsdWl5RHdKQUQ2Zmc3YjJUcW83NHdjTyJ9LCJpYXQiOjE2NzUxNzc0MTYsImV4cCI6MzE3MjE5NjE5ODE2fQ.PLkLL4KQnC3boA-3SUDGtVqNZimayZKSMFyIPEFAoXM'
const mockedId = 2


describe('Order test', () => {
    it('Post /orders should add order if authorized', async () => {
        const response = await request.post('/orders')
        .set('Authorization', `Bearer ${mockedToken}`)
        .send({product_id:2, quantity:200, user_id:1, status:'Active'})
        expect(response.status).toBe(200)
    })
    it('/Orders return all orders if authorized by authorization middleware', async () => {
          const response = await request.get('/orders').set('Authorization', `Bearer ${mockedToken}`)
          console.log("ORDER DATA :", response)
        expect(response.status).toBe(200)
    })
    it('/Orders/:id returns a specific order if authorized by the authorization middleware', async() => {
         const response = await request.get(`/orders/${mockedId}`).set('Authorization', `Bearer ${mockedToken}`)
         expect(response.status).toBe(200)
    })
    
    it('Post /orders creates order if authorized', async () => {
        const res = await request.post('/orders').set('Authorization', `Bearer ${mockedToken}`).send({product_id:6, quantity:300, user_id:1, status:'Very active'})
        expect(res.status).toBe(200)
   })
    })

  
