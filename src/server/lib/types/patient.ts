import { z } from "zod";
import { Appointment } from "./appointment";

export const Patient = z.object({
    id: z.string(),
    name: z.string(),
    lastName: z.string(),
    phone: z.number().optional(),
    appointment: z.array(Appointment)
})

export type Patient = z.infer<typeof Patient>
