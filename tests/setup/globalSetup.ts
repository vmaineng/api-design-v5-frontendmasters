import { db } from '../../src/db/connection.ts'
import { users, habits, entries, tags, habitTags } from '../../src/db/schema.ts'
import { sql } from 'drizzle-orm'
import { execSync } from 'child_process'

export default async function setup() {
    console.log('setting up test database')
   try { 
    await db.execute(sql`DROP TABLE IF EXISTS ${entries} CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS ${habits} CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS ${users} CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS ${tags} CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS ${habitTags} CASCADE`)

    console.log('pushing schema using drizzle kit')
    execSync(`npx drizzle-kit push --url="${process.env.DATABASE_URL}" --schema="../../src/db/schema.ts --dialect='postgresql'`,
        {
        stdio: 'inherit', //show me all the logs in this terminal
        cwd: process.cwd()
        }
    )
    console.log('Test DB created')

   } catch(e) { 
    console.error('Failed to setup test DB', e)
    throw e
   }
   //leave database clean
}