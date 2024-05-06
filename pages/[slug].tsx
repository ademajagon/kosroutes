import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import { Route } from "types";
import { useIsSmall } from "utils/hooks";
import { motion } from "framer-motion";
import Link from "next/link";
import MapBox from "components/mapbox";
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
