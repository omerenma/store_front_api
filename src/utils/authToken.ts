import  { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface Decode {
    id: number;
    firstname: string;
    lastname:string
}
export const verifyToken = (
    req: Request, 
    res: Response,
    next: NextFunction
): void => {
    try {
        const authorization = req.headers.authorization;
        const token = authorization?.split(' ')[1]
        const bearer = authorization?.split(' ')[0]
        let decode; 
        if (token) {
             decode = jwt.verify(token, process.env.TOKEN_SECRET as string)
        }
        
        if (decode) {
            next()
        } else {
            throw Error('You do not have the permision to do this')
        }
      
    } catch (error) {
        res.status(401)
        res.json('Unauthorized')
    }
    
}

