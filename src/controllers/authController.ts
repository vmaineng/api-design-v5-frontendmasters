import type {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import { db} from '../db/connection.ts'
import {users} from '../db/schema.ts'
import { generateToken } from '../utils/jwt.ts'
import { hashPassword } from '../utils/passwords.ts'
import { User } from '../db/schema.ts'

export const register = async (req: Request<any, User>, res: Response) => { 
    try { 
        const {email, username, password, firstName, lastName } = req.body
        const hashedPassword = await hashPassword(password)
        const [user] = await db.insert(users).values({
            email, username, password, firstName, lastName
        })
    } catch(e) { 
        console.error("Registration error ", e)
        res.status(500).json({error: 'Failed to create user'})
    }
}
