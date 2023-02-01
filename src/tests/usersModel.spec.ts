import usersRoutes from '../handler/users';
import { UserModel } from '../models/users'

const store = new UserModel()
const id: number = 1
const deleteId: number = 1
const mockedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxMTcsImZpcnN0bmFtZSI6Ik5ldmVyIGV4cGlyZXMiLCJsYXN0bmFtZSI6Ik5ldmVyIGV4cGlyZXMgbGFzdG5hbWUiLCJwYXNzd29yZCI6IiQyYiQxMCRaZFhrMzVNRDhFSVNXTU5QTml4T3EuNjIyb1ZYOXpsdWl5RHdKQUQ2Zmc3YjJUcW83NHdjTyJ9LCJpYXQiOjE2NzUxNzc0MTYsImV4cCI6MzE3MjE5NjE5ODE2fQ.PLkLL4KQnC3boA-3SUDGtVqNZimayZKSMFyIPEFAoXM'

describe('User Models', () => {
    it('should have an index method', async () => {
        const result = await store.index()
        expect(result).toBeDefined()
    })
    it('should have a create method with firstname, lastname, password parameters', async () => {
       const result = await store.create({firstname:'kingsley', lastname:'omerenma', password:'omerenma1'})
       expect(result).toBeDefined()
    })
    it('should have a show method with id parameter', async () => {
        const result = await store.show(id)
        expect(result).toBeDefined()
    })
     it('should have an edit method with id, firstname, lastname parameters', async () => {
        const result = await store.edit({id:1, firstname:'kingsley', lastname:'omerenma'})
        expect(result).toBeDefined()
     })
 
})