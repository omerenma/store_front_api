import { Request, Response, NextFunction, response } from 'express'
import router from 'express'
import supertest from 'supertest'
import server from '../server'

const request = supertest(server)
const mockedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxMTcsImZpcnN0bmFtZSI6Ik5ldmVyIGV4cGlyZXMiLCJsYXN0bmFtZSI6Ik5ldmVyIGV4cGlyZXMgbGFzdG5hbWUiLCJwYXNzd29yZCI6IiQyYiQxMCRaZFhrMzVNRDhFSVNXTU5QTml4T3EuNjIyb1ZYOXpsdWl5RHdKQUQ2Zmc3YjJUcW83NHdjTyJ9LCJpYXQiOjE2NzUxNzc0MTYsImV4cCI6MzE3MjE5NjE5ODE2fQ.PLkLL4KQnC3boA-3SUDGtVqNZimayZKSMFyIPEFAoXM'
const mockedId = 97
describe('Test users handler endpoint', () => {
    it('Post /user should add a user', async() => {
        const response = await request.post('/user').send({firstname:'Kingsley', lastname:"Onyebuchi", password:"password"})
        expect(response.status).toBe(200)
    })
    it('/Users returns all the users if authorized by the authorization middleware', async() => {
        const response = await request.get('/users').set('Authorization', `Bearer ${mockedToken}`)
        expect(response.status).toBe(200)
    })

    it('/Users/:id returns a specific user if authorized by the authorization middleware', async() => {
        const response = await request.get(`/user/${mockedId}`).set('Authorization', `Bearer ${mockedToken}`)
        //console.log('USER :', response.body)
        expect(response.status).toBe(200)
    })
})