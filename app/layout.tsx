import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import Head from "next/head";
import MapBox from "components/mapbox";
import { Route, Routes } from "types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kosova Routes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const routes: Routes = [
    {
      author: { name: "Malthe", url: "https://twitter.com/malthart" },
      color: "#f59e0b",
      description:
        "From the station town of Ry, you are sent off along the lakes, and the route starts idyllically and flat until you reach Dynæs. In the old days, there was a fortress here. Up through Old Lave and around the hills of Linå Vesterskov. After this, the majestic peaks Sindbjerg and Stoubjerg are hit. The trip now zigzags through the hills of Nordskoven - before Silkeborg is suddenly glimpsed, and you run flat through to the finish line at Silkeborg Sports Club.",
      distance: 30.08878997567962,
      elevation: 785.05,
      geoJson: { type: "FeatureCollection", features: [] },
      location: "Julsø · Denmark",
      rating: 4,
      slug: "julso_scenic_trail",
      type: "run",
      date: "2023-04-26",
    },
  ];

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
              <MapBox routes={routes} />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
