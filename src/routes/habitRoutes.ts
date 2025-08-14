import { Router } from 'express'
import { validateBody, validateParams } from '../middleware/validation.ts'
import {z} from 'zod';
import { authenticateToken } from '../middleware/auth.ts';
import { createHabit, getUserHabits, updateHabit } from '../controllers/habitController.ts';

const createHabitSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    frequency: z.string(),
    targetCount: z.string(),
    tagsIds: z.array(z.string()).optional() //doing an array with strings
})

const completeParamsSchema = z.object({
    id: z.string(),


})
//params is key value object

const router = Router()

router.use(authenticateToken)

router.get("/", getUserHabits)

router.get("/:id", (req, res) => { 
    res.json({message: 'get one habit'})
})

router.patch('/:id', updateHabit)

router.post("/", validateBody(createHabitSchema), createHabit) //before you can run this code, this middleware is going to be sent first
//if multiple middleware, can put them in arrays

router.delete("/:id", (req, res) => { 
    res.json({message: 'deleted habit'})
})

router.post('/:id/complete',validateParams(completeParamsSchema), validateBody(createHabitSchema), (req, res) => {
  res.json({message: 'completed habit'})
})

export default router