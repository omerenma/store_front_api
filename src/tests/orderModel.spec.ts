import { OrdersModel } from '../models/orders'

const id: string = '7'
const orderId: string = '5'
const store = new OrdersModel()
describe('Orders Models', () => {
    it('should have an index method in order model', async () => {
        const result = await store.index()
        expect(result).toBeDefined()
    })
      it('should return an array of orders greater than or equal to 1 from database', async () => {
        const result = await store.index()
        console.log("ORDER MODEL Result :", result)
        expect(result.length).toBeGreaterThanOrEqual(1)
    }) 
})