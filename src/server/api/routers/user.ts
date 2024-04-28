import crypto from "@/server/lib/crypto";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  newUser: publicProcedure
    .mutation(async ({ ctx }) => {
      return ctx.db.user.create({
        data: {
          username: 'usuarioPrueba',
          password: crypto().encrypt('pass123')
        }
      })
    }),

  getUser: protectedProcedure
    .query(async ({ ctx }) => {

      const user = ctx.session.user

      return user
    })
})
