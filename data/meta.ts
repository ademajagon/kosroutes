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
    description: "",
    rating: 4,
    location: "Kosove · Pejë",
    color: colors.blue[500],
    added: "2024-05-07",
    coordinate: "42°46′24″N 20°16′21″E",
  },
  gurikuq: {
    description: "",
    rating: 4,
    location: "Kosove · Rugove",
    color: colors.green[500],
    added: "2024-05-07",
    coordinate: "42°39′47″N 20°08′04″E",
  },
};

module.exports = { meta };
