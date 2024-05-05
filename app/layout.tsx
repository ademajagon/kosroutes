import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import Head from "next/head";
import MapBox from "components/mapbox";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kosova Routes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          value={{
            light: "light-theme",
            dark: "dark-theme",
          }}
        >
          <Head>
            <meta
              name="viewport"
              content="width=device-width, user-scalable=no"
            />
          </Head>

          <main className="flex sm:h-screen w-screen sm:overflow-hidden">
            {/* <aside className="w-full sm:w-[430px] bg-primary min-h-screen sm:overflow-x-hidden sm:overflow-y-hidden sm:absolute top-0 bottom-0 px-5 ">
              {children}
            </aside> */}
            <div className="block text-xl text-forest h-screen relative w-full">
              <MapBox />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
