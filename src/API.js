import { get, post } from 'axios'
import ServerActions from './actions/ServerActions'

const API = {
  searchAddress(address){
    // console.log('key:', process.env.API_KEY)
    get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.API_KEY}`)
    .then(res => {
      // console.log('res:', res);
      ServerActions.gotCoord(res.data.results[0].geometry.location)
    })
      .catch(console.error)
  },

  showCloseBy(pos){
    let coord = `${pos.lat},${pos.lng}`;
    get(`/api/places/${coord}`)
    .then(res => {
      let { data } = res;
      ServerActions.gotPlaces(data.results)
    })
      .catch(console.error)
  },

  showFarPlace(pos){
    let coord = `${pos.lat},${pos.lng}`;
    get(`/api/places/${coord}`)
    .then(res => {
      let { data } = res;
      ServerActions.gotFarPlaces(data.results)
    })
      .catch(console.error)
  }
}

export default API
