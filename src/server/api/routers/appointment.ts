import { Appointment } from "@/server/lib/types/appointment";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const appointmentRouter = createTRPCRouter({

  create: protectedProcedure
    .input(Appointment.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.appointment.create({
        data: { ...input }
      })
    }),

  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      const appointments = await ctx.db.appointment.findMany()

      return appointments
    }),

  getUnique: protectedProcedure
    .input(Appointment.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      const appointment = await ctx.db.appointment.findUniqueOrThrow({
        where: { id: input.id }
      })

      return appointment
    }),

  getByUser: protectedProcedure
    .input(Appointment.pick({ userId: true }))
    .query(async ({ ctx, input }) => {
      const userAppointments = await ctx.db.appointment.findMany({
        where: { userId: input.userId }
      })

      return userAppointments
    }),

  getByPatient: protectedProcedure
    .input(Appointment.pick({ patientId: true }))
    .query(async ({ ctx, input }) => {
      const patientAppointment = await ctx.db.appointment.findMany({
        where: { patientId: input.patientId }
      })

      return patientAppointment
    }),

  update: protectedProcedure
    .input(Appointment)
    .mutation(async ({ ctx, input }) => {

      await ctx.db.appointment.update({
        where: { id: input.id },
        data: { ...input }
      })
    }),

  delete: protectedProcedure
    .input(Appointment.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.appointment.delete({ where: { id: input.id } })
    })
})
