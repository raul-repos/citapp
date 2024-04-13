import crypto from "@/utils/cripto";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  newUser: publicProcedure
  .mutation(async({ctx}) => {
    return ctx.db.user.create({
        data:{
            username: 'usuarioPrueba',
            password: crypto().encrypt('pass123')
        }
    })
  })
    })