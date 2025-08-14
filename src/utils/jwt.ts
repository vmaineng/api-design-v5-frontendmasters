import { SignJWT } from 'jose'
import { createSecretKey, Sign } from 'crypto'
import env from '../../env.ts'

export interface JwtPayLaod {
  //all unique items but don't put sensitive info on it
  //put identifying trait on playload
  id: string
  email: string
  username: string
}

export const generateToken = (payload: JwtPayLaod) => {
  const secret = env.JWT_SECRET
  const secretKey = createSecretKey(secret, 'utf-8') //
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRES_IN || '7d')
    .sign(secretKey)
}
