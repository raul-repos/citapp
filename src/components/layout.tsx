import { Group, Paper } from "@mantine/core";
import SideBar from "./siderbar";
import Logo from "./logo";
import { PropsWithChildren } from "react";

export function Layout({ children }: PropsWithChildren) {
	return (
		<>
			<Paper p={'md'} m={0} withBorder radius={0} >
				<Group w={'100vw'}>
					<SideBar />
					<Logo />
				</ Group>
			</Paper>
			{children}
		</>
	)
}

