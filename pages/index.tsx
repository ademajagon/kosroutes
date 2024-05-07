import Route from "components/route";
import { GetStaticProps } from "next";
import { Routes } from "types";
const gpxUtils = require("../utils/gpxutils.js");

type RoutesProps = {
  routes: Routes;
};

function Home({ routes }: RoutesProps) {
  return (
    <div className="pt-3">
      <nav className="flex justify-end">
        <button className="text-white">Add Route</button>
      </nav>

      <header className="py-16 text-center">
        <h1 className="text-3xl font-bold uppercase py-3 text-white">
          Kosova Routes
        </h1>
        <p className="text-primary">
          A selection of trails for walking and running in Kosovo
        </p>
      </header>

      <section>
        <div className="sticky top-0 z-10 flex justify-between px-5 py-4 -mx-5 bg-blur">
          <h1 className="text-2xl font-bold text-primary">All Routes</h1>
        </div>

        <ol>
          {routes.map((route) => {
            return <Route key={route.slug} route={route} />;
          })}
        </ol>
      </section>

      <footer className="pb-6 text-center text-secondary">
        A project by <span className="text-forest">Agon Ademaj</span>
      </footer>
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
