"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import { Route, Routes } from "types";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

type MapBoxProps = {
  routes: Routes;
};

const initialLng = 20.82953;
const initialLat = 42.6185676;
const zoom = 8.5;

function MapBox({ routes }: MapBoxProps): JSX.Element {
  const mapContainer = useRef(null);

  // const [stateMap, setStateMap] = useState(null);

  console.log(routes, "ROUTES");

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [initialLng, initialLat],
      zoom,
    });

    // map.on("load", () => {
    //   setStateMap(map);
    // });
    return () => map.remove();
  }, [routes]);

  return <div className="absolute inset-0" ref={mapContainer} />;
}

export default MapBox;
