import { signIn} from "next-auth/react";

import { Paper, Title } from "@mantine/core";

export default function Home() {
  return (
    <>
    <Title align="center">
      Citapp
    </Title>
    <Title order={4} align="center">
      Tu portal de gestión de citas
    </Title>
    <Paper>
     This is a box with shadow
      <button
        onClick={() => signIn()}
      >
        Login
      </button>
    </Paper>
    </>
  );
}
