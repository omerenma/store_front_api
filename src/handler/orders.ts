import express, { Request, Response } from 'express'
import { verifyToken } from '../utils/authToken'
import { OrdersModel} from '../models/orders'

const getOrders =  async (_req: Request, res: Response) => {
    try {
        const users = new OrdersModel()
        const result = await users.index()
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json(error)
    }
}

const getOderById = async(req:Request, res:Response) => {
    try {
        const { id } = req.params
        const user = new OrdersModel()
        const result = await user.show(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}

const addOrder = async (req: Request, res: Response) => {
    const data = {
        product_id:  req.body.product_id,
        quantity:req.body.quantity,
        user_id:req.body.user_id,
        status: req.body.status
    }
    try {
        const order = new OrdersModel()
        const result = await order.create(data)
        res.status(200).send(result)
    } catch (error) {
        res.json(error)
    }
}

const addProduct = async (req: Request, res: Response) => {
    console.log(req.body, req.params)
    const order = new OrdersModel()
    const orderId: string = req.params.id
    const productId: number = (req.body.productId)
    const quantity: number = req.body.quantity
    try {
        const addedProduct = await order.addProducts(quantity, orderId, productId)
        res.json(addedProduct)
    } catch (error) {
        console.log(error)
        res.send(error)
        
    }
}


const ordersRoutes = (app: express.Application) => {
    app.get('/orders',verifyToken,getOrders);
    app.get('/orders/:id',verifyToken, getOderById)
    app.post('/orders', verifyToken, addOrder)
    app.post('/orders/:id/products', verifyToken, addProduct)
}

export default ordersRoutes