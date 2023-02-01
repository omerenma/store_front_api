import usersRoutes from '../handler/users';
import { UserModel } from '../models/users'

const store = new UserModel()
const id: string = '1'
const deleteId: number = 1
describe('User Models', () => {
    it('should have an index method', async () => {
        const result = await store.index()
        expect(result).toBeDefined()
    })
    it('should have a create method with id, firstname, lastname, password parameters', async () => {
       const result = await store.create({firstname:'kingsley', lastname:'omerenma', password:'omerenma1'})
       console.log('USER DATA :',  result)
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
    //  it('should have a delete method with id parameter', async () => {
    //     const result = await store.deleteUser(deleteId)
    //     expect(result).toBeDefined()
    //  })
    
})