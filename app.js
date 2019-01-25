const request = require("request");
const key = require("./secret");

request(
  {
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=1301%20lombard%20street%20philadelphia`,
    json: true
  },
  (err, response, body) => {
    console.log(body);
  }
);
