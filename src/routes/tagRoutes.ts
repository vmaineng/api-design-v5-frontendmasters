import { Router } from 'express'
import { authenticateToken } from '../middleware/auth.ts'

const router = Router()
router.use(authenticateToken) // Apply authentication to all routes below

router.get('/', (req, res) => {
  res.json({ message: 'tag' })
})

export default router
