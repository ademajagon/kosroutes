import { Routes } from "types";

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
    </div>
  );
}

export default Home;
