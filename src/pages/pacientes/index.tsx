import { Layout } from "@/components/layout";
import { AppointmentCard } from "@/components/userAppointments";
import { Patient } from "@/server/lib/types/patient";
import { api } from "@/utils/api";
import { Accordion, Alert, Button, Center, Group, LoadingOverlay, Modal, NumberInput, Paper, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertCircle, IconUserPlus } from "@tabler/icons-react";
import { ReactElement, useEffect, useState } from "react";

export default function PatientList() {
  const { data, isLoading, isError } = api.patient.getAll.useQuery()
  if (isLoading) return <LoadingOverlay visible={true} />

  if (isError) return <>Se ha producido un error </>

  return (
    <>
      <Title order={1} align="center" my={'xl'}>
        Pacientes
      </Title>
      <PatientActions />
      <Accordion w={'80%'} mx={"auto"} mt="xl" variant={"separated"}>
        {data!.map(patient => <Accordion.Item value={patient.id} key={patient.id}><PatientCard patient={patient as Patient} /></Accordion.Item>)}
      </Accordion>
    </>
  )
}

function PatientCard({ patient }: { patient: Patient }) {
  return (
    <>
      <Accordion.Control >{patient.name} {patient.lastName} </Accordion.Control>
      <Accordion.Panel>
        <Title order={3} align="center">Citas</Title>
        {patient.appointment.length == 0 ? <Center w={'100%'}>Sin citas programadas</Center> : patient.appointment.map(appointment => <SimpleGrid key={appointment.id} cols={3}><AppointmentCard data={appointment} username={"John Doe"} /></SimpleGrid>)}
      </Accordion.Panel>
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
    <>	<Group my={"md"} w={"100vw"} position="right"><Button variant="outline" w={"small"} mr={'xl'} leftIcon={<IconUserPlus />} onClick={open}>Añadir paciente</Button></Group>
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

