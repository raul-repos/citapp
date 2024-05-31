import { Button, Modal, Title, Text, TextInput, Alert, LoadingOverlay } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconAlertCircle, IconUserCog } from "@tabler/icons-react"
import { api } from "@/utils/api"
import { useEffect, useState } from "react"

export function UserOptions() {
    const {data:user, isLoading: isUserLoading} = api.user.getUser.useQuery()
    const [opened, { open, close }] = useDisclosure()
    const { mutate, isPending, isSuccess, isError, error: IOError } = api.user.updateUser.useMutation()
    const [name, setName] = useState(user?.name)
    const [password, setPassword] = useState<string>()
    const [newPassword, setNewPassword] = useState<string>()
    const [newPassword2, setNewPassword2] = useState<string>()
    const [error, setError] = useState<string>()

    useEffect(() => {
        setError(undefined)
    }, [password])


    useEffect(() => {
        if (isSuccess) {
            close()
        }
    }, [isSuccess])

    if (isUserLoading) return <LoadingOverlay visible={true} />


    function onNewUser() {
        let err = ""

        if (!password) {
            err = err + " Contraseña obligatoria"
        }

        if (err) {
            setError(err)
            return
        }

        mutate({
            username: user!.username,
            password: password!,
            name: name,
            newPassword,
            id: user!.id
        })
    }

    return (
        <>
            <Button variant="light" w={'100%'} onClick={open} leftIcon={<IconUserCog />}>Modificar usuario</Button>
            <Modal opened={opened} onClose={close} withCloseButton={false}>
                <Title align="center">Crear nuevo usuario</Title>
                <Text my={'md'} mx={'auto'} c={'dimmed'}>Se creará un nuevo usuario para iniciar sesión en la aplicación. El usuario tendrá acceso a toda la aplicación.</Text>
                <TextInput label="Nombre" value={name} onChange={e => setName(e.target.value)} />
                <TextInput label="Nueva Contraseña" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                <TextInput label="Repite la nueva contraseña" type="password" disabled={!newPassword} value={newPassword2} onChange={e => setNewPassword2(e.target.value)} error={newPassword != newPassword2 ? "Las contraseñas no coinciden": false} />
                <TextInput type="password" label="Contraseña" required value={password} onChange={e => setPassword(e.target.value)} description={"Introduce la contraseña original para continuar"} />
                <Button mt={'xl'} w={'small'} loading={isPending} onClick={onNewUser} disabled={!password}>Actualizar datos</Button>
                {error ?
                    <Alert icon={<IconAlertCircle size={'1rem'} />} title={'¡Error!'} color={'red'}>
                        Error al validar el formulario:
                        {error}
                    </Alert>
                    : null
                }
                {isError ?
                    <Alert icon={<IconAlertCircle size={'1rem'} />} title={'¡Error!'} color={'red'}>
                        Error al enviar el formulario:
                        {IOError.message}
                    </Alert>
                    : null
                }
            </Modal>
        </>
    )

}