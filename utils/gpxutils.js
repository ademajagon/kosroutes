const fs = require("fs");
const path = require("path");
const xmldom = require("xmldom");
const turflength = require("@turf/length").default;
const toGeoJson = require("@mapbox/togeojson");
const met = require("../data/meta");
const { lineString } = require("@turf/helpers");

const ROUTES_PATH = path.join(process.cwd(), "public", "gpx");

const routeFilePaths = fs
  .readdirSync(ROUTES_PATH)
  .filter((p) => /\.gpx?$/.test(p));

const routes = routeFilePaths.map((filePath) => {
  const source = new xmldom.DOMParser().parseFromString(
    fs.readFileSync(path.join(ROUTES_PATH, filePath), "utf8")
  );

  const slug = filePath.replace(".gpx", "");

  const metadata = met.meta[slug];

  const geoJson = toGeoJson.gpx(source);

  const distance = turflength(geoJson);

  const { coordinates } = geoJson.features[0].geometry;
  let totalDistance = 0;
  let elevation = 0;

  coordinates.forEach((currentCoordinate, i) => {
    const nextCoordinate = coordinates[i + 1];

    if (!nextCoordinate) {
      return;
    }

    const line = lineString([
      [currentCoordinate[0], currentCoordinate[1]],
      [nextCoordinate[0], nextCoordinate[1]],
    ]);

    const newDistance = turflength(line);

    totalDistance += newDistance;

    if (i === 0) {
      currentCoordinate.push(0);
    }

    nextCoordinate.push(totalDistance);

    const elevationDifference = nextCoordinate[2] - currentCoordinate[2];
    if (elevationDifference > 0) elevation += elevationDifference;
  });

  if (metadata?.points) {
    metadata.points.forEach((point, i) => {
      const { lat, lng, description } = point;

      geoJson.features.push({
        type: "Feature",
        properties: {
          id: `point-${i}`,
          description,
          icon: "pin",
        },
        geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
      });
    });
  }

  return {
    distance,
    elevation,
    geoJson,
    id: slug,
    slug,
    color: metadata?.color || "red",
    description: metadata?.description || null,
    rating: metadata?.rating || null,
    location: metadata?.location || null,
    type: metadata?.type || "run",
    added: metadata?.added,
    author: metadata?.author || null,
    coordinates,
    coordinate: metadata?.coordinate || null,
  };
});

module.exports = { routes };
