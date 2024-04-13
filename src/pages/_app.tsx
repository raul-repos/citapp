import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import {MantineProvider} from "@mantine/core"
import {Notifications} from "@mantine/notifications"
import { api } from "@/utils/api";
import { theme } from "@/styles/global";


const inter = Inter({
  subsets: ["latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className={inter.className}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={theme}
        >
        < Notifications />
        <Component {...pageProps} />
        </MantineProvider>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
