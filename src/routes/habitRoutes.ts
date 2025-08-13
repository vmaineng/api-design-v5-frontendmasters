import { Router } from 'express'

const router = Router()

router.get("/", (req, res) => { 
    res.json({message: 'habits'})
})

router.get("/:id", (req, res) => { 
    res.json({message: 'get one habit'})
})

router.post("/", (req, res) => { 
    res.json({message: 'created habit'})
})

router.delete("/:id", (req, res) => { 
    res.json({message: 'deleted habit'})
})

router.post('/:id/complete', (req, res) => {
  res.json({message: 'completed habit'})
})

export default router