import type {Response} from 'express'
import type { AuthenticatedRequest } from '../middleware/auth.ts'
import { db} from '../db/connection.ts'
import { habits, entries, habitTags} from '../db/schema.ts'
import {eq, and, desc, inArray } from 'drizzle-orm'

export const createHabit = async (req: AuthenticatedRequest, res: Response) => { 
    try { 
        const {name, description, frequency, targetCount, tagIds } = req.body
        //transaction to database = write to database, need to write twice
        //but second write failed
        //group a bunch of databased together, and if one fail, it will stop
        //doing a git commit of all changes all at once
        const result = await db.transaction(async (tx) => { 
            const [newHabit ] = await tx.insert(habits).values ({
                userId: req.user.id,
                name, 
                description, 
                frequency,
                targetCount
            }).returning()

            if (tagIds && tagIds.length > 0) { 
                const habitTagValues = tagIds.map((tagId) => ({
                    habitId: newHabit.id,
                    tagId
                }))
                await tx.insert(habitTags).values(habitTagValues)
            }
            return newHabit
        })

        res.status(201).json({
            message: 'Habit created',
            habit: result,
        })
    } catch(e) { 
        console.error('Create habit error', e)
        res.status(500).json({error: "Failed to create habit"})
    }
}