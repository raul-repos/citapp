import crypto from "@/server/lib/crypto";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { User } from "@/server/lib/types";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  newUser: protectedProcedure
    .input(User.pick({name: true, username: true, password: true}))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          ...input,
          password: crypto().encrypt(input.password)
        }
      })
    }),

  getUser: protectedProcedure
    .query(async ({ ctx }) => {

      const user = ctx.session.user

      return user
    }),

  updateUser: protectedProcedure
    .input({ ...User.pick({ name: true, username: true, password: true, id: true }).extend({newPassword: z.string().optional()})})
    .mutation(async ({ctx, input}) => {
      const isPasswordOk = crypto().compareWithHash(input.password, ctx.session.user.password)
      if (!isPasswordOk) {
        throw new Error("Contraseña incorrecta", {cause:'Password invalid'})
      }

      if (!input.newPassword) {
        input.newPassword = input.password
      }

      return ctx.db.user.update({
        where: {
          id: input.id
        },
        data: {
          name: input.name,
          username: input.username,
          id: input.id,
          password: crypto().encrypt(input.newPassword)
        }
      })
    }),

    findUser: protectedProcedure
    .input(User.pick({id:true}))
    .query(async({ctx, input}) => {
      return ctx.db.user.findUnique({
        where: {
          id: input.id
        }
      })
    })
})
