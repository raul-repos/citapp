import { pacifico } from "@/pages/_app";
import { Title } from "@mantine/core";

export default function Logo() {
	return (
		<Title className={pacifico.className} py={"0.4rem"} c='red'>
			Citapp
		</Title>
	)
}
