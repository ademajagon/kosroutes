const colors = require("tailwindcss/colors");

const meta = {
  kosova: {
    description:
      "Not for the faint of heart! This trail combines Booleden and Värmdöleden for around 40km of (mostly) trails. Booleden (15km) starts at Boo Hembygsgård in Orminge and leads to Strömmen on the border to Värmdö, where the Värmdöleden takes over (25k). They are both marked with orange stripes on trees or poles. Do not miss the breathtaking view from Himlaberget (70.4m above sea level).",
    rating: 5,
    location: "Rugove",
    color: colors.red[500],
    added: "2020-03-29",
  },
  goat_loop: {
    description:
      'With a mix of mountains and pavement, this route starts at San Augustin and goes around the goat cheese farm "🐐 Quesería la Gloria". The trail part starts by the end of the parking lot of Hotel Gloria Palace. Pass through the tunnel and make a sharp left after ~100 meters on a small steep trail (270m at 22% avg grade). After this hill the trail gets easier with a steady climb towards the goat farm. Take a right after passing the farm which will bring you down towards the ocean (with amazing views). After the descent simply follow the paved road back towards San Augustin.',
    rating: 4,
    location: "San Augustin · Gran Canaria",
    color: colors.yellow[500],
    added: "2022-09-16",
  },
};

module.exports = { meta };
