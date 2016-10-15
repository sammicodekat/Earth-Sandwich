import { get, post } from 'axios'
import ServerActions from './actions/ServerActions'

const API = {
  searchAddress(address){
    // console.log('key:', process.env.API_KEY)
    get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCoAuYhajAzi3Sn7ciZQVaUGe2-rYqN7bU`)
    .then(res => {
      console.log('res:', res);
      ServerActions.gotCoord(res.data.results[0].geometry.location)
    })
      .catch(console.error)
  }
}

export default API
