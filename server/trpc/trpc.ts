import { TRPCError, initTRPC } from '@trpc/server'
import { Context } from './context'


export const t = initTRPC.context<Context>().create()

// 这是一个中间件，用于检查用户是否拥有管理员权限
const isTeacher = t.middleware(({ next, ctx }) => {
  if (ctx.user.type !== 'teacher') {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  })
})

// 我们可以设置多个Procedure以供不同权限的调用
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isTeacher)

export const router = t.router;
export const middleware = t.middleware;