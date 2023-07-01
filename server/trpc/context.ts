import { inferAsyncReturnType } from '@trpc/server'
import { decodeJWT, verifyJWT } from '../utils/jwt'
import type { H3Event } from 'h3'

// 创建上下文
export async function createContext(event: H3Event) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers

  // This is just an example of something you might want to do in your ctx fn
  const authorization = getRequestHeader(event, 'authorization')
  async function getUserFromHeader() {
    if (authorization) {
      if (verifyJWT(authorization)) return null
      const user = await decodeJWT(authorization)
      return user
    }
    return null
  }
  const user = await getUserFromHeader()

  return {
    user,
  }
}
export type Context = inferAsyncReturnType<typeof createContext>
