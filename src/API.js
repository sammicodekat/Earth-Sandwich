import { get, post } from 'axios'
import ServerActions from './actions/ServerActions'

const API = {
  searchAddress(address){
    // console.log('key:', process.env.API_KEY)
    get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.API_KEY}`)
    .then(res => {
      console.log('res:', res);
      ServerActions.gotCoord(res.data.results[0].geometry.location)
    })
      .catch(console.error)
  },

  showCloseBy(pos){
    let coord = `${pos.lat},${pos.lng}`;
    // console.log('coord:', coord)
    // get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coord}&radius=500&key=$AIzaSyCoAuYhajAzi3Sn7ciZQVaUGe2-rYqN7bU`)
    get(`/api/places/${coord}`)
    .then(res => {

      console.log('res:', res);

    })
      .catch(console.error)
  }
}

export default API
