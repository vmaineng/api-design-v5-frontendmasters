import { Router } from 'express' //module = closure = closure is a function

const router = Router()

router.post('/register', (req, res) => {
  //201 == post was good, 200 = get was good
  res.status(201).json({ message: 'user signed up' })
})

router.post('/login', (req, res) => {
  res.status(201).json({ message: 'user logged in' })
})

export default router
