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
     it('should add new product with id, name and price', async () => {
        const result = await store.create({id:12, name:'Hp Computer 1', price:40000})        
        expect(result.length).toBeGreaterThanOrEqual(1)
     })
    
})