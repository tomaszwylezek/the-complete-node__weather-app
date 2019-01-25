const request = require("request");
const yargs = require("yargs");
const key = require("./secret");

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

const encodedAddress = encodeURIComponent(argv.address);

request(
  {
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${encodedAddress}`,
    json: true
  },
  (err, response, body) => {
    console.log(`Address: ${body.results[0].locations[0].street}`);
    console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
    console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`);
    // console.log(JSON.stringify(body, undefined, 2));
  }
);
