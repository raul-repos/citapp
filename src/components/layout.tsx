import { Group, Paper } from "@mantine/core";
import SideBar from "./siderbar";
import Logo from "./logo";
import { PropsWithChildren } from "react";
import Link from "next/link";

export function Layout({ children }: PropsWithChildren) {
	return (
		<>
			<Paper p={'md'} m={0} withBorder radius={0} >
				<Group w={'100vw'}>
					<SideBar />
					<Link style={{ textDecoration: 'none' }} href={'/dashboard'}>
						<Logo />
					</Link>
				</ Group>
			</Paper>
			{children}
		</>
	)
}

