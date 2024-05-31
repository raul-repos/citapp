import { AppointmentCard } from "@/components/appointmentCard";
import { CreateAppointment } from "@/components/createAppointment";
import { Layout } from "@/components/layout";
import { User } from "@/server/lib/types";
import { Patient } from "@/server/lib/types/patient";
import { api } from "@/utils/api";
import { Accordion, Alert, Button, Center, Group, LoadingOverlay, Modal, NumberInput, Paper, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertCircle, IconUserPlus } from "@tabler/icons-react";
import { ReactElement, useEffect, useState } from "react";

export default function PatientList() {
  const { data, isLoading, isError, refetch } = api.patient.getAll.useQuery()
  const { data: user, isLoading: userLoading } = api.user.getUser.useQuery()
  if (isLoading || userLoading) return <LoadingOverlay visible={true} />

  if (isError) return <>Se ha producido un error </>

  return (
    <>
      <Title order={1} align="center" my={'xl'}>
        Pacientes
      </Title>
      <PatientActions user={user!} />
      <Accordion w={'80%'} mx={"auto"} mt="xl" variant={"separated"}>
        {data!.map(patient => <Accordion.Item value={patient.id} key={patient.id}><PatientCard patient={patient as Patient} refetch={refetch} /></Accordion.Item>)}
      </Accordion>
    </>
  )
}

function PatientCard({ patient, refetch }: { refetch: () => void, patient: Patient }) {
  return (
    <>
      <Accordion.Control >{patient.name} {patient.lastName} </Accordion.Control>
      <Accordion.Panel>
        <Title order={3} align="center">Citas</Title><SimpleGrid cols={3}>
          {patient.appointment.map(appointment => <AppointmentCard key={appointment.id} refetch={refetch} data={appointment} />)}</SimpleGrid>
        {patient.appointment.length == 0 ? <Center w={'100%'}>Sin citas programadas</Center> : null}
      </Accordion.Panel>
    </>
  )
}

function PatientActions({ user }: { user: User }) {
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
    <>
      <Group my={"md"} w={"80vw"} position="right" mx={'auto'}>
        <Button variant="outline" w={"small"} mr={'xl'} leftIcon={<IconUserPlus />} onClick={open}>
          Añadir paciente
        </Button>
        <CreateAppointment user={user} refetch={refetch} />
      </Group>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <TextInput required value={name} onChange={e => setName(e.target.value)} label={'Nombre'} error={"El nombre no puede estar vacío"} />
        <TextInput required value={lastName} onChange={e => setLastName(e.target.value)} label={'Apellidos'} />
        <NumberInput value={phone} onChange={(e: number) => setPhone(e)} label={'Telefono'} hideControls />
        <Button onClick={onNewPatient} mt={'xl'} disabled loading={mutation.isPending}>Crear nuevo paciente </Button>
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

