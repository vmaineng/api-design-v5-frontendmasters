//type check our environment variable and have some guarantees is there

import { env as loadEnv } from 'custom-env'
import { z } from 'zod'

process.env.APP_STAGE = process.env.APP_STAGE || 'dev'

const isProduction = process.env.APP_STAGE === 'production'
const isDevelopment = process.env.APP_STAGE === 'dev'
const isTesting = process.env.APP_STAGE === 'test'

if (isDevelopment) {
  loadEnv()
} else if (isTesting) {
  loadEnv('test')
}

//production = the env variables should be injected to you on the hosting environment

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  APP_STAGE: z.enum(['dev', 'test', 'production']).default('dev'),

  PORT: z.coerce.number().positive().default(3000),

  DATABASE_URL: z.string().startsWith('postgresql://'),
  //mobile links open with this
  //postgresql has their own protocol with postgresql. similar to http

  JWT_SECRET: z.string().min(32, 'Must be 32 chars long'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  BCRYPT_ROUNDS: z.coerce.number().min(10).max(20).default(12),
})

export type Env = z.infer<typeof envSchema> //passing argument into a type (which is called a generic)
//write types in zod = have benefit of type checking of runtime and the TS of types

//can flatten it since Zod schemas can be nested w/ json.stringify

let env: Env

try {
  env = envSchema.parse(process.env)
} catch (e) {
  if (e instanceof z.ZodError) {
    console.error('Invalid env var')
    console.error(JSON.stringify(e.flatten().fieldErrors, null, 2)) //format with spaces of two

    e.errors.forEach((err) => {
      const path = err.path.join('.')
      console.error(`  ${path}: ${err.message}`)
    })

    process.exit(1)
  }
  throw e
}

export const isProd = () => env.APP_STAGE === 'production'
export const isDev = () => env.APP_STAGE === 'dev'
export const isTesting = () => env.APP_STAGE === 'test'

export { env }
export default env
