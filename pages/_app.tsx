import { AppProps } from "next/app";
import "../styles/globals.css";
import Head from "next/head";
import MapBox from "components/mapbox";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      <main>
        <aside className="">
          <Component {...pageProps} />
        </aside>

        <div className="">
          <MapBox routes={pageProps.routes} />
        </div>
      </main>
    </>
  );
}

export default MyApp;
