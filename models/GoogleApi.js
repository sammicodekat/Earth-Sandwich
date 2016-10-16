const axios = require('axios')
require('dotenv').load();

exports.getPlaces = (loc, cb) => {
  axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${loc}&rankby=distance&key=${process.env.API_KEY}`)
  .then(res => {
    let { data } = res;
    cb(null, data)
  })
  .catch((error) => cb(error))
}
