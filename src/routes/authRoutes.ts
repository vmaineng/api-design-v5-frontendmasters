import { Router } from 'express'

const router = Router()

// Routes
router.post('/auth', (req, res) => {
  res.json({ message: 'auth' })
})

export default router
