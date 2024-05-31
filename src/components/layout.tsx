import { Group, Paper, SimpleGrid } from "@mantine/core";
import SideBar from "./siderbar";
import Logo from "./logo";
import { PropsWithChildren } from "react";
import Link from "next/link";
import { UserBadge } from "./userBadge";

export function Layout({ children }: PropsWithChildren) {
	return (
		<>
			<Paper w={'100vw'} p={'md'} m={0} withBorder radius={0} >
				<SimpleGrid cols={2}>
					<Group w={'100%'}>
						<SideBar />
						<Link style={{ textDecoration: 'none' }} href={'/dashboard'}>
						<Logo />
					</Link>
					</Group>
					<Group w={'100%'} position="right" pr={'xl'}><UserBadge /></Group>
				</SimpleGrid>


			</Paper>
			{children}
		</>
	)
}

