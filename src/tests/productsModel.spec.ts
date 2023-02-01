import usersRoutes from '../handler/users';
import { ProductsModel } from '../models/products'

const store = new ProductsModel()
const id: string = '7'
const productId: Number = 6
describe('Product Models', () => {
    it('should have an index method in product model', async () => {
        const result = await store.index()
        expect(result).toBeDefined()
    })
    it('should have a show method with id parameter in product model', async () => {
        const result = await store.show(id)
        expect(result).toBeDefined()
    })
     it('should have a create method with id, name, price parameters', async () => {
        const result = await store.create({id:5, name:'Test Product 1', price:300})
        console.log("PRODUCT RESULT :", response);
        
        expect(result).toBeDefined()
     })
    
})