import { ReactElement } from 'react';
import { Layout } from '@/components/layout';
import { UserAppointments } from '@/components/userAppointments';
import { Title } from '@mantine/core';

export default function Dashboard() {
  return (
    <><Title align='center'>Mis citas </Title><UserAppointments /></>
  );
}


Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}


