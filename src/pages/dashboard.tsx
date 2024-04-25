import { AppShell, Navbar, Header, Paper, Title } from '@mantine/core';
import { SessionContextValue, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect } from 'react';
import { pacifico } from './_app';

export default function Dashboard() {
  return (
    <Layout>
    </Layout>
  );
}


function _Header({ session }: { session: SessionContextValue }) {
  return (
    <Paper p={'md'} m={0} withBorder radius={0} h={'5vh'} >
      Hello {session.data?.user.username}
      <Title className={pacifico.className} c='red'>
        Citapp
      </Title>
    </Paper>
  )
}


function Layout({ children }: PropsWithChildren) {
  const { push } = useRouter()
  const session = useSession()
  useEffect(() => { // If user is not authenticated, go to login
    if (session.status == 'unauthenticated') {
      push('/') // login is currently in root 
    }
  }
    , [session])
  return (
    <>
      <_Header session={session} />
      {children}
    </>
  )
}
