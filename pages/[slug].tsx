import { GetStaticPaths, GetStaticProps } from "next";
import { Route } from "types";
const gpxUtils = require("../utils/gpxutils");

function RoutePage({
  route,
}: {
  route: Route;
  initialLat: number;
  initialLng: number;
}) {
  return <div>Route {`${route.geoJson.features[0].properties.name}`}</div>;
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
