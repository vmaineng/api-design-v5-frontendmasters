import {drizzle} from 'drizzle-orm/node-postgres'
import {Pool} from 'pg'
import * as schema from './schema.ts'
import { env, isProd} from '../../env.ts'
import { remember} from '@epic-web/remember';
import { connect } from 'http2';

const createPool = () => {
    return new Pool({
        connectionString: env.DATABASE_URL,
    })
}

//making an instance of it
let client

if (isProd()) { 
    client = createPool()
} else { //for development and watching only
    //sever database is HTTP based.
    client = remember('dbPool', () => createPool()) //singleton - a cached version of some value - so you can reuse the same value
}

export const db = drizzle({client, schema})

export default db