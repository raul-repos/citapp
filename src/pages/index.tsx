import { signIn} from "next-auth/react";

import {IconAlertCircle} from "@tabler/icons-react"
import { Alert, Button, Center, Group,  Paper, PasswordInput, TextInput, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
    const {push} = useRouter()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    async function onLogin(){
        setErrorMsg("")
        const response = await signIn('credentials', {username, password, redirect: false})
        if (!response) {
          setErrorMsg("Se ha producido un error en la red. Por favor inténtalo de nuevo más tarde.")
        }
        if (response?.status == 401) {
          setErrorMsg("Usuario o contraseña incorrectos")
          setUsername("")
          setPassword("")
        }
        if (response!.status == 200) void push('/dashboard')
    }
  return (
      <Center w={'100vw'} h={'100vh'}>
        <Paper withBorder p={'xl'} shadow="md">
          <Title>
            Iniciar sesión en Citapp
          </Title>
          <TextInput value={username} onChange={e => setUsername(e.target.value)} placeholder="usuarioPrueba" label='Usuario'/>
          <PasswordInput value={password} onChange={e => setPassword(e.target.value)} placeholder="pass123" label='Contraseña'/>
          <Group w={'100%'} position="center" mt={'md'}>

          <Button onClick={onLogin}>
            Iniciar sesión
          </Button>
          </Group>
          {errorMsg ?
            <Alert mt={'xl'} icon={<IconAlertCircle size="1rem" />} title='¡Error!' color="red">
              {errorMsg}
            </Alert>
          :null}
        </Paper>
      </Center>
  );
}
