import { Router } from 'express' //module = closure = closure is a function
import { register } from '../controllers/authController.ts'
import { validateBody } from '../middleware/validation.ts'
import { insertUserSchema } from '../db/schema.ts'

const router = Router()

router.post('/register', validateBody(insertUserSchema), //201 == post was good, 200 = get was good
  register)

router.post('/login', (req, res) => {
  res.status(201).json({ message: 'user logged in' })
})

export default router
