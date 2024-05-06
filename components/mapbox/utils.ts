import extent from "turf-extent";

export const paint = {
  current: {
    "circle-color": "white",
    "circle-radius": 3,
    "circle-opacity": 1,
    "circle-stroke-color": "blue",
    "circle-stroke-width": 3,
    "circle-stroke-opacity": 1,
  },
  start: {
    "circle-color": "white",
    "circle-radius": 3,
    "circle-opacity": 1,
    "circle-stroke-color": "#87CF3E",
    "circle-stroke-width": 3,
    "circle-stroke-opacity": 1,
  },
  end: {
    "circle-color": "white",
    "circle-radius": 3,
    "circle-opacity": 1,
    "circle-stroke-color": "#333333",
    "circle-stroke-width": 3,
    "circle-stroke-opacity": 1,
  },
};

export const flyToGeoJson = (map, geoJson) => {
  const bbox = extent(geoJson);
  map.fitBounds(bbox, {
    padding: 20,
  });
};
