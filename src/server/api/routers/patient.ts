import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Patient } from "@/server/lib/types/patient";

export const patientRouter = createTRPCRouter({

  create: protectedProcedure
    .input(Patient.omit({ id: true, appointment: true }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.patient.create({
        data: { ...input }
      })
    }),

  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      const patients = await ctx.db.patient.findMany()

      return patients
    }),

  getUnique: protectedProcedure
    .input(Patient.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      const patient = await ctx.db.patient.findUniqueOrThrow({
        where: {
          id: input.id
        }
      })

      return patient
    })
})
