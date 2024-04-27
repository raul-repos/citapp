import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { Inter, Pacifico } from "next/font/google";
import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import { api } from "@/utils/api";
import { theme } from "@/styles/global";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";


const inter = Inter({
  subsets: ["latin"],
});

export const pacifico = Pacifico({ weight: '400', subsets: ['latin'] })

//eslint-disable-next-line
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    //eslint-disable-next-line
    <SessionProvider session={session}>
      <main className={inter.className}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={theme}
        >
          < Notifications />
          {getLayout(<Component {...pageProps} />)}
        </MantineProvider>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
