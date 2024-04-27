import { Burger, Drawer } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

export default function SideBar() {
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
