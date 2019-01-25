const axios = require("axios");
const { locationKey, forecastKey } = require("./secret");

const argv = require("./yargs");
const encodedAddress = encodeURIComponent(argv.address);

const geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${locationKey}&location=${encodedAddress}`;
const getWeatherUrl = (lat, lng) =>
  `https://api.darksky.net/forecast/${forecastKey}/${lat},${lng}`;

axios
  .get(geocodeUrl)
  .then(({ data: { info: { statuscode }, results } }) => {
    if (statuscode === 400) {
      throw new Error("Wrong data provided !");
    } else {
      const {
        latLng: { lat, lng },
        adminArea1,
        adminArea4,
        adminArea5,
        postalCode,
        street
      } = results[0].locations[0];
      const formattedAddres = `${adminArea4 ||
        adminArea5} ${street} ${postalCode} ${adminArea1}`;

      console.log(formattedAddres);
      const weatherUrl = getWeatherUrl(lat, lng);

      return axios.get(weatherUrl);
    }
  })
  .then(({ data: { currently: { temperature, apparentTemperature } } }) => {
    console.log(
      `It's currently ${temperature}. It feels like ${apparentTemperature}`
    );
  })
  .catch(e => {
    console.log(e);
  });
