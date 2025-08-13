import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'habit' })
})

export default router
