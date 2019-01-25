const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");
const argv = require('./yargs');


geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(JSON.stringify(results, undefined, 2));

    weather.getWeather(
      results.latitude,
      results.longitude,
      (errorMessage, weatherResults) => {
        if (errorMessage) {
          console.log(errorMessage);
        } else {
          console.log(
            `It's currently ${weatherResults.temperature}. It feels like ${
              weatherResults.apparentTemperature
            }`
          );
        }
      }
    );
  }
});
