import { publicProcedure, router } from '../trpc'
import { z } from 'zod'
import { generateJWT } from '../../utils/jwt'
import prisma from '../../db'

export const authRouter = router({
  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        type: z.enum(['teacher', 'student']),
      }),
    )
    .query(async ({ input }) => {
      console.log(input);
      const { username, password } = input
      if (input.type === 'teacher') {
        const user = await prisma.teachers.findUnique({
          where: {
            teacherID: username,
          },
        })
        if (!user) {
          throw new Error('用户不存在')
        }
        if (user.password !== password) {
          throw new Error('密码错误')
        }
        return {
          user,
          type: 'teacher',
          token: generateJWT({
            username,
            type: 'teacher',
          }),
        }
      }
      if (input.type === 'student') {
        const user = await prisma.student.findUnique({
          where: {
            sno: username,
          },
        })
        if (!user) {
          throw new Error('用户不存在')
        }
        if (user.password !== password) {
          throw new Error('密码错误')
        }
        return {
          user,
          type: 'student',
          token: generateJWT({
            username,
            type: 'student',
          }),
        }
      }
    }),
  getDBUser: publicProcedure
    .query(({ ctx }) => {
      return {
        user: ctx.user,
      }
    }),
})