import { studentProcedure, router } from '../trpc'
import { z } from 'zod'
import prisma from '../../db'

export const studentRouter = router({
  getStudentInfo: studentProcedure
    .query(async ({ ctx }) => {      
      const { user } = ctx
      const student = await prisma.student.findUnique({
        where: {
          sno: user.username,
        },
      })
      return {
        student,
      }
    }),
})