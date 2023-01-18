import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ProductsModel} from '../models/products'
import { verifyToken } from '../utils/authToken'

const getProducts =  async (_req: Request, res: Response) => {
    try {
        const users = new ProductsModel()
        const result = await users.index()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getProductById = async(req:Request, res:Response) => {
    try {
        const { id } = req.params
        const user = new ProductsModel()
        const result = await user.show(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}

const addProduct = async (req: Request, res: Response) => {
    const data = {
       name: req.body.name,
        price: req.body.price
    }
    try {
        const product = new ProductsModel()
        const result = await product.create(data)
        res.status(200).send(result)
    } catch (error) {
        res.json(error)
    }
}

const editProducts = async (req: Request, res: Response) => {
    try {
        const data = {
       name: req.body.name,
        price: Number(req.body.price),
        id: parseInt(req.params.id)
    }
        const product = new ProductsModel();
        const result = await product.editProducts(data)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}

const deleteProducts = async(req: Request, res: Response) => {
    try {
        const id = req.params.id
        console.log(id)
        const product = new ProductsModel();
        const result = await product.deleProduct(parseInt(id))
        res.status(200).json(result)
    } catch (error) {
        res.json(error)
        //res.status(400).json(error)
    }
}

const productsRoutes = (app: express.Application) => {
    app.get('/products',getProducts);
    app.get('/products/:id',verifyToken, getProductById)
    app.post('/product',verifyToken,addProduct)
    app.put('/product/:id',verifyToken, editProducts)
    app.delete('/product/:id',verifyToken, deleteProducts)
}

export default productsRoutes