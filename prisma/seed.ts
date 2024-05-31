// This file is used to populate the local database generated in Docker container


import { User } from "@/server/lib/types";
import { Appointment } from "@/server/lib/types/appointment";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const initialUser: User[] = [
    {
        id: "cluvhkxoy00007moudlzwaidb",
        username: "usuarioPrueba",
        name: "Usuario 1",
        password: "$2b$10$8BAXHs7/DA6k/2xzjYXlS.wDTHXIIbiLkpKxFx7gcmdXpIWDFcRZu",
    },
    {
        id: "clwtm6j0j0000109zvdofvlws",
        username: "usuarioPrueba2",
        name: "Usuario 2",
        password: "$2b$10$8BAXHs7/DA6k/2xzjYXlS.wDTHXIIbiLkpKxFx7gcmdXpIWDFcRZu",
    }
]

const initialPatients = [
    {
        id: "clvhtzgu6000013yp00j0ugnp",
        name: "Sergio",
        lastName: "Peña",
        phone: 6515799
    },
    {
        id: "clvkwyfdy0000qoi9u9e6wvzn",
        name: "Emilio",
        lastName: "Delgado",
        phone: 6549381
    },
    {
        id: "cluvhkxoy00007moudlzwaidb",
        name: "Sonia",
        lastName: "Cañizares",
        phone: 6948667
    }
]

const initialAppointments: Appointment[] = [
    {
        id: "clws1p7wf0009mylcj9xkilkw",
        date: new Date("2024-05-23T13:30:09.197Z"),
        patientId: "clvhtzgu6000013yp00j0ugnp",
        userId: "cluvhkxoy00007moudlzwaidb"
    },
    {
        id: "clws30fpa000dmylcdf9izkb2",
        date: new Date("2024-05-01T21:59:50.782Z"),
        patientId: "clvkwyfdy0000qoi9u9e6wvzn",
        userId: "cluvhkxoy00007moudlzwaidb"
    },
    {
        id: "clws443u8000hmylc9l44kjx9",
        date: new Date("2024-05-30T18:35:42.743Z"),
        patientId: "clvhtzgu6000013yp00j0ugnp",
        userId: "cluvhkxoy00007moudlzwaidb"
    },
    {
        id: "clwua7jsf0001svmsnmph6kr6",
        date: new Date("2024-05-10T22:00:00.000Z"),
        patientId: "clvkwyfdy0000qoi9u9e6wvzn",
        userId: "clwtm6j0j0000109zvdofvlws"
    }
]

const seed = async () => {
    await prisma.user.createMany({
        data: initialUser
    })

    await prisma.patient.createMany({
        data: initialPatients
    })

    await prisma.appointment.createMany({
        data: initialAppointments
    })
}

seed()