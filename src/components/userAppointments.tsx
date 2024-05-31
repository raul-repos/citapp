import { User } from "@/server/lib/types"
import "dayjs/locale/es"
import { api } from "@/utils/api"
import { Divider, Group, LoadingOverlay, Stack } from "@mantine/core"
import { AppointmentCard } from "./appointmentCard"
import { CreateAppointment } from "./createAppointment"

export function UserAppointments() {
	const { data: user, isLoading } = api.user.getUser.useQuery()

	if (isLoading) return <LoadingOverlay visible={true} />
	if (!user) return <></>
	return (
		<AppointmentsList user={user} />
	)
}


function AppointmentsList({ user }: { user: User }) {
	const { data, isLoading, isError, error, refetch } = api.appointment.getByUser.useQuery({ userId: user.id })

	if (isLoading) return <LoadingOverlay visible={true} />
	if (isError) return <>Se ha producido un error!!: {error.message}</>
	if (!data) return <>No data </>

	// --- Get unique dates for UI display ---

	function formatMonthYear(date: Date): string {
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
		const year = date.getFullYear();
		return `${month}/${year}`;
	}
	// Display based on month and year
	const uniqueMonthYears = Array.from(new Set(data.map(item => formatMonthYear(item.date))));

	// reorder dates from newest to oldest
	uniqueMonthYears.sort((a, b) => {
		const [monthA, yearA] = a.split('/').map(Number);
		const [monthB, yearB] = b.split('/').map(Number);
		return new Date(yearB!, monthB! - 1).getTime() - new Date(yearA!, monthA! - 1).getTime();
	});


	return (
		<>
			<Group my={"md"} w={"80vw"} mx={'auto'} position="right">
				<CreateAppointment user={user} refetch={refetch} />
			</Group>
			{uniqueMonthYears.map(date => {
				const [month, year] = date.split('/').map(Number);
				const appointments = data.filter(app => {
				const itemMonth = app.date.getMonth() + 1;
				const itemYear = app.date.getFullYear();
				return itemMonth === month && itemYear === year;
			});
			return (
			<Stack key={date} maw={'80vw'} mx={'auto'}>
				<Divider size={"xl"} key={date} label={date} color="blue.4" labelProps={{size: "2rem"}}/>
				{appointments.map(appointment => <AppointmentCard refetch={refetch} data={appointment} key={appointment.id} />)}
			</Stack>
			)
			})}
		</>
	)
}
