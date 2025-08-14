import { db } from './connection.ts'
import { users, habits, entries, tags, habitTags } from './schema.ts'

const seed = async () => {
  //good to be logging to see what's happening in the terminal
  console.log('starting database seed....')

  try {
    console.log('clearing existing data...')
    // shouldn't have production data locally in the computer - only drop local data and not in production data
    await db.delete(entries)
    await db.delete(habitTags)
    await db.delete(habits)
    await db.delete(tags)
    await db.delete(users)
    console.log('creating demo users...')
    const [demoUser] = await db
      .insert(users)
      .values({
        email: 'demo@habittracker.com',
        username: 'demouser',
        password: 'password1',
        firstName: 'Demo',
        lastName: 'User',
      })
      .returning()

    console.log('creating tags...')
    const [healthTag] = await db
      .insert(tags)
      .values({
        name: 'healthTag',
        color: '#10B981',
      })
      .returning() //if you don't add this, they will give you only metadata and it won't give you the rows itself

    const [exerciseHabit] = await db
      .insert(habits)
      .values({
        userId: demoUser.id,
        name: 'Exercise',
        description: 'daily workout',
        frequency: 'daily',
        targetCount: 1,
      })
      .returning()

    await db.insert(habitTags).values([{
      habitId: exerciseHabit.id,
      tagId: healthTag.id,
  }])

    console.log('adding in entries')

    const today = new Date()
    today.setHours(12, 0, 0, 0)

    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      await db.insert(entries).values({
        habitId: exerciseHabit.id,
        completionDate: date,
      })
    }

    console.log('DB seeded successfully')
    console.log('user credentials')
    console.log(`email: ${demoUser.email}`)
  } catch (e) {
    console.error('seed failed, e')
    process.exit(1)
  }
}

//to prevent it from running outside of the terminal
if (import.meta.url === `file://${process.argv[1]}`) {
  //gives you filepath of current version you are in; used to be dirname
  seed()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

export default seed
