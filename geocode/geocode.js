const request = require("request");
const key = require("../secret");

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  request(
    {
      url: `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${encodedAddress}`,
      json: true
    },
    (err, response, body) => {
      if (err) {
        callback("Unable to connect to service");
      } else if (body.info.statuscode === 400) {
        callback("Wrong data provided !");
      } else if (body.results[0].locations.length) {
        callback(null, {
          address: `${body.results[0].locations[0].adminArea4} ${
            body.results[0].locations[0].street
          } ${body.results[0].locations[0].postalCode}`,
          latitude: body.results[0].locations[0].latLng.lat,
          longitude: body.results[0].locations[0].latLng.lng
        });
      }
    }
  );
};

module.exports = {
  geocodeAddress
};
