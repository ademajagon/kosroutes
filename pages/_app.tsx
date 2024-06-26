import { AppProps } from "next/app";
import "../styles/globals.css";
import Head from "next/head";
import MapBox from "components/mapbox";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useIsSmall } from "utils/hooks";
import { ThemeProvider } from "next-themes";
import { MapProvider } from "components/mapprovider";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();

  const aside = useRef<HTMLElement>();

  const isSmall = useIsSmall();

  useEffect(() => {
    const sidebar = aside.current;

    if (sidebar) {
      sidebar.scrollTop = 0;
    }
  }, [router]);

  return (
    <ThemeProvider
      attribute="class"
      value={{ light: "light-theme", dark: "dark-theme" }}
    >
      <MapProvider>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, user-scalable=no"
          />
          <title>Kosova Routes</title>
        </Head>
        <main className="flex bg-[#E6E4E0] sm:h-screen w-screen sm:overflow-hidden">
          <aside
            ref={aside}
            className="w-full sm:w-[430px] bg-primary min-h-screen sm:overflow-y-auto sm:overflow-x-hidden sm:absolute top-0 bottom-0 px-5"
          >
            <Component {...pageProps} />
          </aside>

          {isSmall && (
            <div className="block text-xl text-forest ml-[430px] h-screen relative w-full">
              <MapBox routes={pageProps.routes} />
            </div>
          )}
        </main>
      </MapProvider>
    </ThemeProvider>
  );
}

export default MyApp;
