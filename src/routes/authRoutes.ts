import { Router } from 'express'
import { register } from '../controllers/authController.ts'
import { validateBody } from '../middleware/validation.ts'
import { z } from 'zod'

const router = Router()

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username too long'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

// Routes
router.post('/register', validateBody(registerSchema), register)

export default router
