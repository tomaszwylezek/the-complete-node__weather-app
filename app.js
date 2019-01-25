const request = require("request");
const key = require("./secret");

request(
  {
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=1301%20lombard%20street%20philadelphia`,
    json: true
  },
  (err, response, body) => {
    console.log(`Address: ${body.results[0].locations[0].street}`);
    console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
    console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`);
    // console.log(JSON.stringify(body, undefined, 2));
  }
);
