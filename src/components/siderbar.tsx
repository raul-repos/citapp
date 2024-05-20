import { Burger, Button, Drawer, Group } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconUser } from "@tabler/icons-react"
import Link from "next/link"

export default function SideBar() {
	const [opened, { toggle }] = useDisclosure(false)
	return (
		<>
			<Drawer opened={opened} onClose={toggle} withCloseButton={false}>
				<DrawerXButton opened={opened} toggle={toggle} />
				<Link href={'/pacientes'}>
					<Button w={'100%'} leftIcon={<IconUser />} variant="light">
						Ver pacientes
					</Button>

				</Link>
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

function DrawerXButton({ opened, toggle }: { opened: boolean, toggle: () => void }) {
	return (
		<Group w={'100%'} position="right">
			<XButton opened={opened} toggle={toggle} />
		</Group>
	)
}
