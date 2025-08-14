import { Router } from 'express'
import { authenticateToken } from '../middleware/auth.ts'

const router = Router()

router.use(authenticateToken)

router.get("/", (req, res) => { 
    res.json({message: 'users'})
})

router.get("/:id", (req, res) => { 
    res.json({message: 'got user'})
}) //admin route to add a user



router.put("/:id", (req, res) => { 
    res.json({message: 'user updated'})
}) //admin route to add a user

router.delete("/:id", (req, res) => { 
    res.json({message: 'user deleted'})
})

export default router