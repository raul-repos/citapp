import { Button, Modal, Title, Text, TextInput, Alert } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconAlertCircle, IconUserPlus } from "@tabler/icons-react"
import { api } from "@/utils/api"
import { useEffect, useState } from "react"

export function CreateUser() {
    const [opened, { open, close }] = useDisclosure()
    const {mutate, isPending, isSuccess, isError, error: IOError} = api.user.newUser.useMutation()
    const [name, setName] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [username, setUsername] = useState<string>()
    const [error, setError] = useState<string>()

    useEffect(() => {
        setError(undefined)
    }, [username, password])

    useEffect(() => {
        if (isSuccess) {
            close()
        }
    }, [isSuccess])

    function onNewUser() {
        let err = ""
        if (!username) {
            err = err + "Nombre de usuario obligatorio"
        }
        if (!password) {
            err = err + " Contraseña obligatoria"
        }
        if (err) {
            setError(err)
            return
        }
        mutate({
            username: username!,
            password: password!,
            name: name
        })
        }

    return (
        <>
            <Button variant="light" w={'100%'} onClick={open} leftIcon={<IconUserPlus />}>Añadir nuevo usuario</Button>
            <Modal opened={opened} onClose={close} withCloseButton={false}>
               <Title align="center">Crear nuevo usuario</Title>
               <Text my={'md'} mx={'auto'} c={'dimmed'}>Se creará un nuevo usuario para iniciar sesión en la aplicación. El usuario tendrá acceso a toda la aplicación.</Text>
                <TextInput label="Nombre de usuario" required value={username} onChange={e => setUsername(e.target.value)} />
                <TextInput type="password" label="Contraseña" required value={password} onChange={e => setPassword(e.target.value)}/>
                <TextInput label="Nombre" value={name} onChange={e => setName(e.target.value)} />
                <Button mt={'xl'} w={'small'} loading={isPending} onClick={onNewUser}>Crear</Button>
                { error ?
                    <Alert icon={<IconAlertCircle size={'1rem'} />} title={'¡Error!'} color={'red'}>
                        Error al validar el formulario:
                        {error}
                    </Alert>
				    : null
                }
                { isError ?
                    <Alert icon = { <IconAlertCircle size = { '1rem' } />} title={'¡Error!'} color={'red'}>
                        Error al enviar el formulario:
                        {IOError.message}
                    </Alert>
                    : null
                }
            </Modal>
        </>
    )

}