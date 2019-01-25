const request = require("request");
const { forecastKey } = require("../secret");

const getWeather = (lat, lng, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/${forecastKey}/${lat},${lng}`,
      json: true
    },
    (err, response, body) => {
      if (!err && response.statusCode === 200) {
        callback(null, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature,

        });
      } else {
        callback("Unable to fetch weather");
      }
    }
  );
};

module.exports = {
  getWeather
};
