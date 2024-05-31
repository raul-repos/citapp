import { api } from "@/utils/api"
import { LoadingOverlay, Button, Modal, Stack, Title, Select, Group, Alert } from "@mantine/core"
import { DateTimePicker } from "@mantine/dates"
import { useDisclosure } from "@mantine/hooks"
import { Patient } from "@prisma/client"
import { IconCalendar, IconAlertCircle } from "@tabler/icons-react"
import { User } from "next-auth"
import { useState, useEffect } from "react"

export function CreateAppointment({ user, refetch }: { user: User, refetch: () => void }) {
    const mutation = api.appointment.create.useMutation()
    const { data, isLoading } = api.patient.getAll.useQuery()
    const [opened, { open, close }] = useDisclosure()
    const [date, setDate] = useState<Date | null>()
    const [error, setError] = useState<string | null>()

    const [patientId, setPatientId] = useState<Patient["id"] | null>()
    useEffect(() => {
        // Automatically close the modal on success
        if (mutation.isSuccess) {
            refetch()
            close()
        }
    }, [mutation.isSuccess])

    if (isLoading) return <LoadingOverlay visible />
    if (!data) return <></>

    const patientData = data.map(p => { return { value: p.id, label: `${p.name} ${p.lastName}` } })

    function onNewAppointment() {
        let err = ""
        if (!patientId) {
            err = "Paciente no seleccionado"
        }
        if (!date) {
            err = err + " Fecha no seleccionada"
        }
        // If validation is not correct, dont send any data to server
        if (err) {
            setError(err)
            return
        }

        const payload = {
            userId: user.id,
            patientId: patientId!,
            date: date!
        }

        mutation.mutate(payload)
    }

    return (
        <>
            <Button variant="outline" w={"small"} leftIcon={<IconCalendar />} mr={"xl"} onClick={open}>Añadir una nueva cita</Button>
            <Modal opened={opened} p={0} m={0} onClose={close} centered size={"55%"} withCloseButton={false} >
                <Stack h={"70vh"}>
                    <Title align="center" order={3}>
                        Nueva cita
                    </Title>
                    <Select label={"Elige el paciente"}
                        data={patientData}
                        onChange={setPatientId}
                    >
                    </ Select>
                    {/* Undefined values to be compliant with type definition and avoids linter errors */}
                    <DateTimePicker locale={"es"} w={"100%"} label="Escoge fecha y hora para la cita" mx={'auto'} value={date} onChange={e => setDate(e)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} placeholder={undefined} />
                    <Group my={"xl"} w={"100%"} position={"center"}>
                        <Button onClick={onNewAppointment} loading={mutation.isPending}>Crear cita</Button>
                    </Group>
                    {mutation.isError ?
                        <Alert icon={<IconAlertCircle size={'1rem'} />} title={'¡Error!'} color={'red'}>
                            Ha ocurrido un error al crear la cita: {mutation.error.message}
                        </Alert>
                        : null}
                    {error ? <Alert icon={<IconAlertCircle size="1rem" />} title="Campos requeridos" color="red">
                        {error}
                    </Alert> : null}
                </Stack>
            </Modal >
        </>
    )
}