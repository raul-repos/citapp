import { z } from "zod";

export const Appointment = z.object({
    id: z.string(),
    userId: z.string(),
    patientId: z.string(),
    date: z.date()
})

export type Appointment = z.infer<typeof Appointment>
