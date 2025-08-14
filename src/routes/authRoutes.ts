import { Router } from 'express' //module = closure = closure is a function
import { logging, register } from '../controllers/authController.ts'
import { validateBody } from '../middleware/validation.ts'
import { insertUserSchema } from '../db/schema.ts'
import {z} from 'zod'

const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(1, 'Password is required'),

})

const router = Router()

router.post('/register', validateBody(insertUserSchema), //201 == post was good, 200 = get was good
  register)

router.post('/login', validateBody(loginSchema), logging)

export default router
