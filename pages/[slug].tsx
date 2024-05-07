import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import { Route } from "types";
import { useIsSmall } from "utils/hooks";
import { motion } from "framer-motion";
import Link from "next/link";
import MapBox from "components/mapbox";
import { Stat } from "components/route";
import Chart from "components/chart";
const gpxUtils = require("../utils/gpxutils");

function RoutePage({
  route,
  initialLat,
  initialLng,
}: {
  route: Route;
  initialLat: number;
  initialLng: number;
}) {
  const [showMap, setShowMap] = useState(false);
  const isSmall = useIsSmall();

  if (!route) {
    return null;
  }

  const { name } = route.geoJson.features[0].properties;

  const statBoxClassName = "justify-center p-2 border border-primary rounded";

  return (
    <motion.div
      className="min-h-screen bg-primary"
      initial={{ x: 430 }}
      animate={{ x: 0 }}
      transition={{ ease: "easeOut", duration: 0.2 }}
      onAnimationComplete={() => setShowMap(true)}
    >
      {route && (
        <>
          <nav className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 -mx-5 border-b border-primary bg-blur">
            <Link href="/" className="transition-opacity hover:opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-[20px] mr-1 -mt-0.5 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="inline-block font-semibold">Routes</span>
            </Link>
          </nav>

          <header className="text-center py-14">
            <h1 className="px-5 py-3 mb-0 -mx-5 text-3xl font-bold text-center -top-5 text-primary">
              {name}
            </h1>

            {route.location && (
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-[14px] mr-1.5 -mt-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <span className="text-xs font-semibold tracking-wide uppercase">
                    {route.location}
                  </span>
                </div>
              </div>
            )}
          </header>

          {!isSmall && (
            <div className="block text-xl text-forest pb-[80%] relative -mx-5 mb-6">
              {showMap && (
                <MapBox
                  routes={[route]}
                  initialLat={initialLat}
                  initialLng={initialLng}
                />
              )}
            </div>
          )}

          <div className="p-3 mb-2 border rounded border-primary">
            <Chart
              coordinates={route.geoJson.features[0].geometry.coordinates}
            />
          </div>

          <ul className="grid grid-cols-2 grid-rows-2 gap-2 mb-6">
            <Stat
              type="Distance"
              value={`${Math.round(route.distance * 10) / 10} km`}
              centered
              className={statBoxClassName}
            />

            <Stat
              type="Elevation"
              value={`${Math.round(route.elevation)} m`}
              centered
              className={statBoxClassName}
            />

            {route.rating && (
              <Stat
                type="Rating"
                value={
                  <>
                    {route.rating}
                    <span className="text-xs text-gray-400">/5</span>
                  </>
                }
                centered
                className={statBoxClassName}
              />
            )}

            <Stat
              type="Coordinates"
              value={route.coordinate}
              centered
              fontSmall
              className={statBoxClassName}
            />
          </ul>
        </>
      )}
    </motion.div>
  );
}

export default RoutePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = gpxUtils.routes.map((route) => ({
    params: { slug: route.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const route = gpxUtils.routes.find((x) => x.slug === context.params.slug);

  return {
    props: {
      initialLat: route.geoJson.features[0].geometry.coordinates[0][1],
      initialLng: route.geoJson.features[0].geometry.coordinates[0][0],
      routes: gpxUtils.routes,
      route,
    },
  };
};
