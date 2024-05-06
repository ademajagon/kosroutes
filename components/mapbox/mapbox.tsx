import { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker"; // eslint-disable-line
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import type { Route, Routes } from "types";
import { useMapContext } from "components/mapprovider";
import {
  paint,
  getHoverGeoJson,
  setAllLayersVisibility,
  flyToGeoJson,
} from "./utils";

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
  initialLng = lng,
  initialLat = lat,
}: MapBoxProps): JSX.Element {
  const { hoverCoordinate } = useMapContext();
  const [stateMap, setStateMap] = useState(null);
  const mapContainer = useRef();

  const router = useRouter();
  const queryRoute = router.query.slug;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [initialLng, initialLat],
      attributionControl: false,
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
            "line-width": 4,
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

        map.on("mouseenter", `${slug}-fill`, () => {
          map.getCanvas().style.cursor = "pointer";
          map.setPaintProperty(slug, "line-width", 6);
        });

        map.on("mouseleave", `${slug}-fill`, () => {
          map.getCanvas().style.cursor = "";
          map.setPaintProperty(slug, "line-width", 4);
        });

        map.loadImage("/pin.png", (error, image) => {
          if (error) throw error;

          map.addImage("pin", image);
        });

        map.addLayer({
          id: `${slug}-points`,
          type: "symbol",
          source: slug,
          layout: {
            "icon-image": ["get", "icon"],
            "icon-size": 0.1,
            "icon-allow-overlap": true,
          },
        });

        map.on("click", `${slug}-points`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const { description } = e.features[0].properties;

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
        });

        map.on("mouseenter", `${slug}-points`, () => {
          map.getCanvas().style.cursor = "pointer";
        });

        map.on("mouseleave", `${slug}-points`, () => {
          map.getCanvas().style.cursor = "";
        });
      });
      setStateMap(map);
    });

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (stateMap) {
      stateMap.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: false,
          },
          trackUserLocation: true,
          showUserHeading: true,
        })
      );
    }
  }, [stateMap]);

  useEffect(() => {
    if (queryRoute && stateMap) {
      routes.forEach((route: Route) => {
        const { slug } = route;
        if (slug === queryRoute) {
          setAllLayersVisibility(stateMap, slug, "visible");
          flyToGeoJson(stateMap, route.geoJson);
        } else {
          setAllLayersVisibility(stateMap, slug, "none");
        }
      });
    } else {
      routes.forEach((route: Route) => {
        const { slug } = route;
        if (stateMap) {
          setAllLayersVisibility(stateMap, slug, "visible", "none");
          stateMap.flyTo({
            center: [initialLng, initialLat],
            essential: true,
            zoom,
          });
        }
      });
    }
  }, [queryRoute, stateMap]);

  useEffect(() => {
    if (stateMap) {
      if (queryRoute && hoverCoordinate) {
        const { slug } = routes.find((route) => route.slug === queryRoute);
        const geoJson = getHoverGeoJson(hoverCoordinate);
        const hoverId = `${slug}-current`;
        if (stateMap.getSource(hoverId)) {
          stateMap.getSource(hoverId).setData(geoJson);
        } else {
          stateMap.addLayer({
            id: hoverId,
            type: "circle",
            source: {
              type: "geojson",
              data: geoJson,
            },
            paint: paint.current,
          });
        }
      } else {
        routes.forEach((route: Route) => {
          const { slug } = route;
          const hoverId = `${slug}-current`;
          if (
            stateMap &&
            stateMap.getSource(hoverId) &&
            stateMap.getLayer(hoverId)
          ) {
            stateMap.removeLayer(hoverId);
            stateMap.removeSource(hoverId);
          }
        });
      }
    }
  }, [stateMap, queryRoute, hoverCoordinate]);

  return <div className="absolute inset-0" ref={mapContainer} />;
}

export default MapBox;
