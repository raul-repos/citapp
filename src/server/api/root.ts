import { postRouter } from "@/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user";
import { patientRouter } from "./routers/patient";
import { appointmentRouter } from "./routers/appointment";

export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
  patient: patientRouter,
  appointment: appointmentRouter
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
