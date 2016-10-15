import { get, post } from 'axios'
import ServerActions from './actions/ServerActions'

const API = {
  searchAddress(address){
    get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.API_KEY}`)
    .then(res => {
      ServerActions.gotCoord(res.data.results[0].geometry.location)
    })
      .catch(console.error)
  }
}

export default API
