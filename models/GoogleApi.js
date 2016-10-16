const axios = require('axios')
require('dotenv').load();

exports.getPlaces = (loc, cb) => {
  console.log('process.env.API_KEY', process.env.API_KEY);
  axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${loc}&radius=500000&key=${process.env.API_KEY}`)
  .then(res => {
    let { data } = res;
    console.log('res:', data);
    cb(null, data)
  })
  .catch((error) => cb(error))
}
