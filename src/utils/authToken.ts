import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'


export const verifyToken = (req: Request, res: Response, next:NextFunction):void => {
    try {
        const authorization = req.headers.authorization;
        const token = authorization?.split(' ')[1];
        jwt.verify(token as string, process.env.TOKEN_SECRET as string)
        next()
    } catch (error) {
        res.status(401)
        res.json('Unauthorized')
    }
}