import { ReactElement } from 'react';
import { Layout } from '@/components/layout';
import { UserAppointments } from '@/components/userAppointments';

export default function Dashboard() {
  return (
    <UserAppointments />
  );
}


Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}


