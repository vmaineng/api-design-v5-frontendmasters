import { Router } from 'express'
import { authenticateToken } from '../middleware/auth.ts'

const router = Router()

// Apply authentication to all routes
router.use(authenticateToken)

router.get('/', (req, res) => {
  res.json({ message: 'user' })
})

export default router
