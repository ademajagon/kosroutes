const colors = require("tailwindcss/colors");

type MetaProps = {
  [obj: string]: {
    description: string;
    rating: number;
    location: string;
    color: typeof colors;
    added: string;
    coordinate: string;
  };
};

const meta: MetaProps = {
  halja: {
    description: "test",
    rating: 4,
    location: "Kosove · Pejë",
    color: colors.blue[500],
    added: "2024-05-07",
    coordinate: "42°46′24″N 20°16′21″E",
  },
  gurikuq: {
    description: "test",
    rating: 4,
    location: "Kosove · Rugove",
    color: colors.green[500],
    added: "2024-05-07",
    coordinate: "42°39′47″N 20°08′04″E",
  },
  oshlak: {
    description: "test",
    rating: 4,
    location: "Kosove · Prizren",
    color: colors.yellow[500],
    added: "2024-05-07",
    coordinate: "42°11′38″N 20°54′45″E",
  },
  peje: {
    description: "test",
    rating: 4,
    location: "Kosove · Peje",
    color: colors.red[500],
    added: "2024-05-07",
    coordinate: "42°39′37″N 20°17′30″E",
  },
  marjash: {
    description: "test",
    rating: 4,
    location: "Kosove · Deqan",
    color: colors.emerald[500],
    added: "2024-05-07",
    coordinate: "42°36′51″N 20°6′6″E",
  },
  ljuboten: {
    description: "test",
    rating: 4,
    location: "Kosove · Kaqanik",
    color: colors.amber[500],
    added: "2024-05-07",
    coordinate: "42°36′51″N 20°6′6″E",
  },
  prizren: {
    description: "test",
    rating: 4,
    location: "Kosove · Prizren",
    color: colors.teal[500],
    added: "2024-05-07",
    coordinate: "42°12′34″N 20°44′44″E",
  },
};

module.exports = { meta };
