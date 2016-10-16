import { get, post } from 'axios'
import ServerActions from './actions/ServerActions'

const API = {
  searchAddress(address) {
    get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.API_KEY}`)
    .then(res => {
      let { location } = res.data.results[0].geometry;
      // console.log('location', location);
      ServerActions.gotCoord(location);
      this.showCloseBy(location);
      let { lat, lng } = location;
      let switchPos = {
        lat: 0 - lat,
        lng: 180 + lng
      }
      this.showFarPlace(switchPos);
      // this.showFarPlace(location);
    })
    .catch(console.error)
  },

  searchDetail(detail) {

  },

  showCloseBy(pos) {
    let coord = `${pos.lat},${pos.lng}`;
    get(`/api/places/${coord}`)
    .then(res => {
      let { data } = res;
      console.log('data', data);
      ServerActions.gotPlaces(data.results)
    })
    .catch(console.error)
  },

  showFarPlace(pos) {
    let coord = `${pos.lat},${pos.lng}`;
    get(`/api/places/${coord}`)
    .then(res => {
      let { data } = res;
      console.log('data', data);
      ServerActions.gotFarPlaces(data.results)
    })
    .catch(console.error)
  }
}

export default API
