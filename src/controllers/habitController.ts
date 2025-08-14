import type { Response } from 'express'
import type { AuthenticatedRequest } from '../middleware/auth.ts'
import { db } from '../db/connection.ts'
import { habits, entries, habitTags } from '../db/schema.ts'
import { eq, and, desc, inArray } from 'drizzle-orm'

export const createHabit = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, description, frequency, targetCount, tagIds } = req.body
    //transaction to database = write to database, need to write twice
    //but second write failed
    //group a bunch of databased together, and if one fail, it will stop
    //doing a git commit of all changes all at once
    const result = await db.transaction(async (tx) => {
      const [newHabit] = await tx
        .insert(habits)
        .values({
          userId: req.user.id,
          name,
          description,
          frequency,
          targetCount,
        })
        .returning()

      if (tagIds && tagIds.length > 0) {
        const habitTagValues = tagIds.map((tagId) => ({
          habitId: newHabit.id,
          tagId,
        }))
        await tx.insert(habitTags).values(habitTagValues)
      }
      return newHabit
    })

    res.status(201).json({
      message: 'Habit created',
      habit: result,
    })
  } catch (e) {
    console.error('Create habit error', e)
    res.status(500).json({ error: 'Failed to create habit' })
  }
}

export const getUserHabits = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userHabitsWithTags = await db.query.habits.findMany({
      where: eq(habits.userId, req.user.id),
      with: {
        habitTags: {
          with: {
            tag: true,
          },
        },
      },
      orderBy: [desc(habits.createdAt)], //newest one at top
    })

    //transform output to look cleaner
    const habitsWithTags = userHabitsWithTags.map((habit) => ({
      ...habit,
      tags: habit.habitTags.map((ht) => ht.tag), // now an array of tag
      habitTags: undefined, // when send undefined it gets excluded in JSON stringify
    }))
    res.json({
      habits: habitsWithTags,
    })
  } catch (e) {
    console.error('Create habit error', e)
    res.status(500).json({ error: 'Failed to create habit' })
  }
}

export const updateHabit = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.params.id
    const { tagIds, ...updates } = req.body //spread two things out b/c have to update to different tables
    const result = await db.transaction(async (tx) => {
      const [updatedHabit] = await tx
        .update(habits)
        .set({ ...updates, updateAt: new Date() })
        .where(and(eq(habitTags.id, id), eq(habits.userId, req.user.id))).returning()
        // ! only update if it is their habit and if it exists in database
        //this is a good check to make sure this is the userId of person so they can do their own habits

        if (!updateHabit) { 
            return res.status(401).end()
        }
        if (tagIds !== undefined) { 
            await tx.delete(habitTags).where(eq(habitTags.habitId, id))
        }

        if (tagIds.length > 0) { 
            const habitTagValues = tagIds.map((tagId) => ({
                habitId: id,
                tagId,
            }) )
            await tx.insert(habitTags).values(habitTagValues)
        }
        return updateHabit
    })

    res.json({
        message: 'Habit was updated',
        habit: result
    })
  } catch (e) {
        console.error('Update habit error', e)
    res.status(500).json({ error: 'Failed to update habit' })
  }
}
