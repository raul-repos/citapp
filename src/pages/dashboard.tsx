import { useDisclosure } from '@mantine/hooks'
import { Paper, Title, Group, Drawer, Burger } from '@mantine/core';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { pacifico } from './_app';

export default function Dashboard() {
  const session = useSession()
  const { push } = useRouter()
  useEffect(() => { // If user is not authenticated, go to login
    if (session.status == 'unauthenticated') {
      push('/') // login is currently in root 
    }
  }, [session])

  return (
    <Paper p={'md'} m={0} withBorder radius={0} >
      <Group w={'100vw'}>
        <SideBar />
        <Logo />
      </ Group>
    </Paper>
  );
}


function Logo() {
  return (
    <Title className={pacifico.className} c='red'>
      Citapp
    </Title>
  )
}


function SideBar() {
  const [opened, { toggle }] = useDisclosure(false)
  return (
    <><Drawer title={<XButton opened={opened} toggle={toggle} />} opened={opened} onClose={toggle} withCloseButton={false}>
      Contenido del drawer
    </Drawer>
      <XButton opened={opened} toggle={toggle} />
    </>
  )
}

function XButton({ opened, toggle }: { opened: boolean, toggle: () => void }) {

  return (
    <Burger opened={opened} onClick={toggle} />
  )
}
