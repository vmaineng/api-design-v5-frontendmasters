import { createTestUser, createTestHabit, cleanupDatabase } from "./dbHelpers.ts";

describe('Test set up', () => { 
    test('should connect to the test db', async () => {
        const { user, token} = await createTestUser()

        expect(user).toBeDefined()
        await cleanupDatabase()
    })
})