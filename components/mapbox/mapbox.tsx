"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import { Route, Routes } from "types";
import { flyToGeoJson, paint } from "./utils";
import { useRouter } from "next/router";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

type MapBoxProps = {
  routes: Routes;
  initialLat?: number;
  initialLng?: number;
};

const lng = 20.82953;
const lat = 42.6185676;
const zoom = 8.5;

function MapBox({
  routes,
  initialLat = lat,
  initialLng = lng,
}: MapBoxProps): JSX.Element {
  const mapContainer = useRef(null);

  const [stateMap, setStateMap] = useState(null);

  console.log(routes, "ROUTESSSSSS ON MAPBOX");

  const router = useRouter();
  const queryRoute = router.query.slug;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [initialLng, initialLat],
      zoom,
    });

    // Add zoom/rotate control to the map
    map.addControl(new mapboxgl.NavigationControl());

    // Add fullscreen control to the map
    map.addControl(new mapboxgl.FullscreenControl());

    map.on("load", () => {
      routes.forEach((route: Route) => {
        const {
          slug,
          color,
          geoJson: { features },
        } = route;

        const { coordinates: startCoordinates } = features[0].geometry;
        const { coordinates: endCoordinates } =
          features[features.length - 1].geometry;

        console.log(startCoordinates, "START ");

        console.log(endCoordinates, "END ");

        map.addSource(slug, {
          type: "geojson",
          data: route.geoJson,
        });

        map.addLayer({
          id: slug,
          type: "line",
          source: slug,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": color,
            "line-width": 5,
          },
        });

        map.addLayer({
          id: `${slug}-fill`,
          type: "fill",
          source: slug,
          paint: {
            "fill-color": "transparent",
            "fill-outline-color": "transparent",
          },
        });

        map.addLayer({
          id: `${slug}-start`,
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {
                description: "Activity Start",
              },
              geometry: {
                type: "Point",
                coordinates: startCoordinates[0],
              },
            },
          },
          paint: paint.start,
        });
        // End point
        map.addLayer({
          id: `${slug}-end`,
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {
                description: "Activitiy End",
              },
              geometry: {
                type: "Point",
                coordinates: endCoordinates.pop(),
              },
            },
          },
          paint: paint.end,
        });

        map.on("click", `${slug}-fill`, () => {
          // Navigate and fly to route on click
          flyToGeoJson(map, route.geoJson);
          if (!queryRoute) {
            router.push(`/${slug}`);
          }
        });
      });
    });

    return () => map.remove();
  }, [routes]);

  return <div className="absolute inset-0" ref={mapContainer} />;
}

export default MapBox;
