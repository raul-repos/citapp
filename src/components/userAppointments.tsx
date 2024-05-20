import { User } from "@/server/lib/types"
import "dayjs/locale/es"
import { Appointment } from "@/server/lib/types/appointment"
import { Patient } from "@/server/lib/types/patient"
import { api } from "@/utils/api"
import { Alert, Button, Group, Loader, LoadingOverlay, Modal, Paper, Select, SimpleGrid, Stack, Title } from "@mantine/core"
import { DateTimePicker } from "@mantine/dates"
import { useDisclosure } from "@mantine/hooks"
import { IconAlertCircle, IconCalendar } from "@tabler/icons-react"
import { useEffect, useState } from "react"

export function UserAppointments() {
	const { data: user, isLoading } = api.user.getUser.useQuery()

	if (isLoading) return <LoadingOverlay visible={true} />
	if (!user) return <></>
	return (
		<>
			<Group my={"md"} w={"100vw"} position="right">
				<CreateAppointment user={user} />
			</Group><AppointmentsList user={user} />
		</>
	)
}


function AppointmentsList({ user }: { user: User }) {
	const { data, isLoading, isError, error } = api.appointment.getByUser.useQuery({ userId: user.id })

	if (isLoading) return <LoadingOverlay visible={true} />

	if (isError) return <>Se ha producido un error!!: {error.message}</>

	if (!data) return <>No data </>

	return (
		<>
			{data.map(appointment => <AppointmentCard user={user} data={appointment} key={appointment.id} />)}
		</>
	)
}

function AppointmentCard({ data, user }: { data: Appointment, user: User }) {

	const { data: patient } = api.patient.getUnique.useQuery({ id: data.patientId })
	return (
		<Paper>
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
					{user.name ?? "Medico"}
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


function CreateAppointment({ user }: { user: User }) {
	const mutation = api.appointment.create.useMutation()
	const { data, isLoading } = api.patient.getAll.useQuery()
	const [opened, { open, close }] = useDisclosure()
	const [date, setDate] = useState<Date | null>()
	const [error, setError] = useState<string | null>()

	const [patientId, setPatientId] = useState<Patient["id"] | null>()
	const { refetch } = api.appointment.getByUser.useQuery({ userId: user.id })
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
			date: date as Date
		}

		mutation.mutate(payload)
	}

	return (
		<><Button variant="outline" w={"small"} leftIcon={<IconCalendar />} mr={"xl"} onClick={open}>Añadir una nueva cita</Button>
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
					<DateTimePicker locale={"es"} w={"100%"} label="Escoge fecha y hora para la cita" mx={'auto'} value={date} onChange={e => setDate(e)} />
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
			</Modal ></>
	)
}
