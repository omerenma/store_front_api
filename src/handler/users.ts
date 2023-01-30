import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/users'
import { verifyToken } from '../utils/authToken'

const getUsers =  async (_req: Request, res: Response) => {
    try {
        const users = new UserModel()
        const result = await users.index()
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json(error)
    }
}

const getUserById = async(req:Request, res:Response) => {
    try {
        const { id } = req.params
        const user = new UserModel()
        const result = await user.show(id)
        if (!result) {
            res.send('No users found')
        }
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}

const addUser = async (req: Request, res: Response) => {
    const data = {
       firstname: req.body.firstname,
        lastname: req.body.lastname,
        password:req.body.password
    }
    try {
        const user = new UserModel()
        const result = await user.create(data)
        let token = jwt.sign({ payload: result }, process.env.TOKEN_SECRET as string, { expiresIn: 3600 })
        res.status(200).send(token)
    } catch (error) {
        res.json(error)
    }
}

const editUser = async (req: Request, res: Response) => {
    const data = {
       firstname: req.body.firstname,
        lastname: req.body.lastname,
        id: parseInt(req.params.id)
    }
    try {
        const user = new UserModel();
        const result = await user.edit(data)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).send(error)
    }
}

const deleteUser = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = new UserModel();
        const result = await user.deleteUser(parseInt(id))
        res.status(200).json(result)
    } catch (error) {
        console.log(error, 'user error')
        res.status(400).json(error)
    }
}


const usersRoutes = (app: express.Application) => {
    app.get('/users',verifyToken,getUsers);
    app.get('/user/:id', verifyToken ,getUserById)
    app.post('/user', addUser)
    app.put('/user/:id', editUser)
     app.delete('/user/:id',deleteUser)
}

export default usersRoutes