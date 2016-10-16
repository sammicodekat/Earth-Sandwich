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
  showCloseBy(coord){
    get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coord}&radius=500&key=${process.env.API_KEY}`)
    .then(res => {
      console.log('res:', res);
      ServerActions.gotNearBy(res.data)
    })
      .catch(console.error)
  }
}

export default API
