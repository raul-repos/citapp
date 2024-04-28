import { User } from "@/server/lib/types"
import { Appointment } from "@/server/lib/types/appointment"
import { api } from "@/utils/api"
import { LoadingOverlay } from "@mantine/core"

export function UserAppointments() {
	const { data: user } = api.user.getUser.useQuery()

	if (!user) return <></>
	return (
		<AppointmentsList user={user} />
	)
}


function AppointmentsList({ user }: { user: User }) {
	const { data, isLoading, isError, error } = api.appointment.getByUser.useQuery({ userId: user.id })

	if (isLoading) return <LoadingOverlay visible={true} />

	if (isError) return <>Se ha producido un error!!: {error.message}</>

	if (!data) return <>No data </>

	return (
		<>
			{data.map(appointment => <AppointmentCard data={appointment} key={appointment.id} />)}
		</>
	)
}

function AppointmentCard({ data }: { data: Appointment }) {

	return (
		<>
			{data.userId}
		</>
	)
}
