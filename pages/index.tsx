import { GetStaticProps } from "next";
import { Routes } from "types";
const gpxUtils = require("../utils/gpxutils.js");

type RoutesProps = {
  routes: Routes;
};

function Home({ routes }: RoutesProps) {
  console.log(routes, "ROUTES");

  return (
    <div className="pt-3">
      <nav className="flex justify-end">
        <button>Add Route</button>
      </nav>

      <header className="py-16 text-center">
        <h1 className="text-3xl font-semibold uppercase py-3">Kosova Routes</h1>
        <p className="text-primary">
          A selection of trails for walking and running in Kosovë
        </p>
      </header>

      <section>
        <div>
          <h1>All Routes</h1>
        </div>

        {/* <ol>
          {routes.map((route) => {
            const { name } = route.geoJson.features[0].properties;

            return <div className="text-forest"> {name}</div>;
          })} 
        </ol> */}
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      routes: gpxUtils.routes.sort(
        (a, b) => new Date(b.added).valueOf() - new Date(a.added).valueOf()
      ),
    },
  };
};

export default Home;
