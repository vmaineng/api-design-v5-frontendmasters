import { Router } from 'express'
import { validateBody, validateParams } from '../middleware/validation.ts'
import {z} from 'zod';

const createHabitSchema = z.object({
    name: z.string(),
})

const completeParamsSchema = z.object({
    id: z.string(),


})
//params is key value object

const router = Router()

router.get("/", (req, res) => { 
    res.json({message: 'habits'})
})

router.get("/:id", (req, res) => { 
    res.json({message: 'get one habit'})
})

router.post("/", validateBody(createHabitSchema), (req, res) => { 
    res.json({message: 'created habit'})
}) //before you can run this code, this middleware is going to be sent first
//if multiple middleware, can put them in arrays

router.delete("/:id", (req, res) => { 
    res.json({message: 'deleted habit'})
})

router.post('/:id/complete',validateParams(completeParamsSchema), validateBody(createHabitSchema), (req, res) => {
  res.json({message: 'completed habit'})
})

export default router