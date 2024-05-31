import { api } from "@/utils/api"
import { Paper, Group, UnstyledButton, Tooltip, Modal, Title, Center, Button, Container, Alert, SimpleGrid, Stack, Loader } from "@mantine/core"
import { DateTimePicker } from "@mantine/dates"
import { Appointment } from "@prisma/client"
import { IconPencil, IconX, IconAlertCircle } from "@tabler/icons-react"
import { useState, useEffect } from "react"

export function AppointmentCard({ data, refetch }: { refetch: () => void, data: Appointment }) {
    const { data: patient } = api.patient.getUnique.useQuery({ id: data.patientId })
    const { data: user, isLoading: isUserLoading } = api.user.findUser.useQuery({ id: data.userId })

    return (
        <Paper>
            <Group w={'100%'} position="right">
                <EditAppointment refetch={refetch} appointment={data}/>
                <DeleteAppointment appointment={data} refetch={refetch}/>
            </Group>
            <SimpleGrid cols={2}>
                <Stack>
                    <Title order={6}>
                        Paciente:
                    </Title>
                    {patient ? `${patient.name} ${patient.lastName}` : <Loader />}
                </Stack>
                <Stack>
                    <Title order={6}>
                        Atiende:
                    </Title>
                    {isUserLoading ? <Loader /> : user ? user.name ?? "Medico" : "Medico"}
                </Stack>
                <Stack>
                    <Title order={6}>
                        Fecha:
                    </Title>
                    {data.date.toLocaleDateString("es-ES")}
                </Stack>
                <Stack>
                    <Title order={6}>
                        Hora:
                    </Title>
                    {data.date.toLocaleTimeString("es-ES", { hour: "numeric", minute: "numeric" })}
                </Stack>
            </SimpleGrid>
        </Paper>
    )
}

function DeleteAppointment({appointment, refetch}:{appointment: Appointment, refetch : () => void}){
    const { mutate, isPending, isSuccess } = api.appointment.delete.useMutation()
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    useEffect(() => {
        if (isSuccess) {
            setOpenDeleteModal(false)
            refetch()
        }
    }, [isSuccess])

    return (
        <>
            <UnstyledButton onClick={() => setOpenDeleteModal(true)}>
                <Tooltip label="Eliminar cita" arrowSize={10} arrowRadius={8} color="red" withArrow>
                    <IconX color="red" />
                </Tooltip>
            </UnstyledButton>

            <Modal opened={openDeleteModal} withCloseButton={false} onClose={() => setOpenDeleteModal(false)}>
                <Title align="center" order={2}>¿Seguro que quieres borrar?</Title>
                <Center my={'xl'}>Esta acción no se puede deshacer, se borrará la cita.</Center>
                <Group w={"100%"} position="center">
                    <Button w={"small"} color="gray" onClick={() => setOpenDeleteModal(false)} variant="subtle">Cancelar</Button>
                    <Button w={"small"} color="red" loading={isPending} onClick={() => mutate({ id: appointment.id })}>Borrar</Button>
                </Group>
            </Modal>
        </>
    )
}




function EditAppointment({refetch, appointment}:{refetch : () => void, appointment: Appointment}) {
    const mutation = api.appointment.update.useMutation()
    const [openEditModal, setOpenEditModal] = useState(false)
    const [date, setDate] = useState<Date | null>(appointment.date)
    const [error, setError] = useState<string | null>()

    useEffect(() => {
        if (mutation.isSuccess) {
            refetch()
            setOpenEditModal(false)
        }
    }, [mutation.isSuccess])

    function onAppointmentUpdate() {
        if (!date) {
            setError(" Fecha no seleccionada")
            return
        }
        const payload: Appointment = {
            ...appointment,
            date
        }
        mutation.mutate(payload)
    }

    return (
        <>
            <UnstyledButton onClick={() => setOpenEditModal(true)}>
                <Tooltip label="Edita esta cita" arrowSize={10} arrowRadius={8} color="blue" withArrow>
                    <IconPencil color="#338adc" />
                </Tooltip>
            </UnstyledButton>

            <Modal opened={openEditModal} withCloseButton={false} centered size={"30%"} h={"55vh"} onClose={() => setOpenEditModal(false)}>
                <Container h={"40vh"}>
                    <Title align="center" order={2}>Editar cita</Title>
                    <DateTimePicker locale={"es"} w={"100%"} label="Escoge fecha y hora para la cita" mx={'auto'} value={date} onChange={e => setDate(e)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} placeholder={undefined} />
                    <Group my={"xl"} w={"100%"} position={"center"}>
                        <Button onClick={onAppointmentUpdate} loading={mutation.isPending}>Editar cita</Button>
                    </Group>
                    {mutation.isError ?
                        <Alert icon={<IconAlertCircle size={'1rem'} />} title={'¡Error!'} color={'red'}>
                            Ha ocurrido un error al crear la cita: {mutation.error.message}
                        </Alert>
                        : null}
                    {error ? <Alert icon={<IconAlertCircle size="1rem" />} title="Campos requeridos" color="red">
                        {error}
                    </Alert> : null}
                </Container>
            </Modal>
        </>
    )
}