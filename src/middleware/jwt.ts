import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const config = {
    key: process.env?.JWT_KEY ?? 'secret',
    options: {
        expiresIn: '2h'
    }
}

export function generateToken (): string {
    const user = {
        username: 'test',
        password: 'test'
    }

    return jwt.sign(user, config.key, config.options)
}

export function verifyToken (req: Request, res: Response, next: Function): void {
    const authHeader = req.headers?.authorization ?? ''
    const token = authHeader.split(' ')[1]
    
    jwt.verify(token, config.key, (err: any) => {
        if (err !== null)
            res.status(401).json('Unauthorized')
        next() 
    }) 
}
