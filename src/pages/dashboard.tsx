import { Paper, LoadingOverlay } from '@mantine/core';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { User } from '@/server/lib/types';
import { api } from '@/utils/api';
import { Layout } from '@/components/layout';

export default function Dashboard() {
  const session = useSession()
  const { push } = useRouter()
  useEffect(() => { // If user is not authenticated, go to login
    if (session.status == 'unauthenticated') {
      void push('/') // login is currently in root 
    }
  }, [session])

  // Session will always have content, otherwhise it will be redirected to /login 
  const user = session?.data?.user as User
  return (
    <UserAppointments user={user} />
  );
}


Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}


function UserAppointments({ user }: { user: User }) {
  const { data, isLoading, isError, error } = api.appointment.getByUser.useQuery({ userId: user.id })

  if (isLoading) return <LoadingOverlay visible={true} />

  if (isError) return <>Se ha producido un error!!: {error.message}</>

  if (!data) return <>No data </>

  return (
    <>
      {data.length > 0 ? data.map(appointment => <Paper key={appointment.id}>{appointment.userId}</Paper>) : <Paper>Aún no hay citas</Paper>}
    </>
  )
}
