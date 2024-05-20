import { Layout } from "@/components/layout";
import { api } from "@/utils/api";
import { Alert, Button, LoadingOverlay, Modal, NumberInput, Paper, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertCircle } from "@tabler/icons-react";
import { ReactElement, useEffect, useState } from "react";

export default function PatientList() {
  // const { data, isLoading, isError } = api.patient.getAll.useQuery()
  const { data, isLoading, isError, refetch } = api.patient.getAll.useQuery()
  if (isLoading) return <LoadingOverlay visible={true} />

  if (isError) return <>Se ha producido un error </>

  return (
    <>
      <Title order={1} align="center" my={'xl'}>
        Pacientes
      </Title>
      <PatientActions />
      {data!.map(patient => <Paper key={patient.id}>{patient.name} {patient.lastName} </Paper>)}
    </>
  )
}

function PatientActions() {
  const mutation = api.patient.create.useMutation()
  const [opened, { open, close }] = useDisclosure()
  const [name, setName] = useState<string>()
  const [phone, setPhone] = useState<number>()
  const [lastName, setLastName] = useState<string>()

  const { refetch } = api.patient.getAll.useQuery()

  useEffect(() => {
    // Automatically close the modal on success
    if (mutation.isSuccess) {
      void refetch()
      void close()
    }
  }, [mutation.isSuccess])

  function onNewPatient() {
    if (name && lastName) {
      mutation.mutate({ name, lastName, phone })
    }
  }

  return (
    <><Button onClick={open}>Añadir paciente</Button>
      <Modal opened={opened} onClose={close}>
        <TextInput required value={name} onChange={e => setName(e.target.value)} label={'Nombre'} />
        <TextInput required value={lastName} onChange={e => setLastName(e.target.value)} label={'Apellidos'} />
        <NumberInput value={phone} onChange={(e: number) => setPhone(e)} label={'Telefono'} />
        <Button onClick={onNewPatient} loading={mutation.isPending}>Crear nuevo paciente </Button>
        {mutation.isError ?
          <Alert icon={<IconAlertCircle size={'1rem'} />} title={'¡Error!'} color={'red'}>
            Ha ocurrido un error al añadir el paciente: {mutation.error.message}
          </Alert>
          : null}
      </Modal></>
  )
}

PatientList.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

