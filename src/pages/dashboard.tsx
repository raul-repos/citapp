import { ReactElement } from 'react';
import { Layout } from '@/components/layout';
import { UserAppointments } from '@/components/userAppointments';
import { Title } from '@mantine/core';
import Logo from '@/components/logo';

export default function Dashboard() {
  return (
    <>
      <Title my={'md'} align='center'>Mis citas</Title>
      <UserAppointments />
    </>
  );
}


Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}


