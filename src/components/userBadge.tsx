import { api } from "@/utils/api";
import { Group, Menu, Title, UnstyledButton } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import { signOut } from "next-auth/react";

export function UserBadge(){
    const {data:user} = api.user.getUser.useQuery()

    return(
        <Menu shadow="md">
            <Menu.Target>
                <UnstyledButton>
                    <Group>

                    <IconUserCircle size={'2.5rem'} color="#338adc"/>
                    <Title order={5}>{user?.name}</Title>
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={() => void signOut()}>
                    Cerrar sesión
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}