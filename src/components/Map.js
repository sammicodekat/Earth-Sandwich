import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';
import MapStore from '../stores/MapStore';
import MapActions from '../actions/MapActions';

// var coords = {
//   lat: 51.5258541,
//   lng: -0.08040660000006028
// };

export default class Map extends Component {
  constructor() {
    super();
    let defPos = MapStore.getDefaultPosition()
    this.state = {
      lat: defPos.lat,
      lng: defPos.lng,
      curLat: 37.639781,
      curLng: -121.800068
    }
    this.onDragEnd = this.onDragEnd.bind(this);
    this._onChange = this._onChange.bind(this);
  }



  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    })
  }

  componentWillMount () {
    MapStore.startListening(this._onChange)
  }
  componentWillUnmount () {
    MapStore.stopListening(this._onChange)
  }

  componentDidMount() {
    let geoLocation = navigator.geolocation.getCurrentPosition((pos) => {
      this.setState({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      })
    });
    let pos = {
      lat: this.state.lat,
      lng: this.state.lng
    }
    console.log("pos in didmount",pos)
    MapActions.globalPosition(pos);
  }

   _onChange(){
     let defPos = MapStore.getDefaultPosition()
     this.setState({
      lat: defPos.lat,
      lng: defPos.lng
     })
    //  MapActions.globalPosition(defPos);
   }

  onDragEnd(e) {
    let pos = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }
    MapActions.globalPosition(pos);
  }

  onCloseClick() {
    console.log('onCloseClick');
  }

  onClick(e) {
    console.log('onClick', e);
  }

  handleSearch (e) {
    e.preventDefault()
    let {input} = this.refs
    let address = input.value
    MapActions.searchAddress(address)
  }

  render() {
    let { lat, lng } = this.state;

    // let lat = 37.774929;
    // let lng = -122.419416;

    // let geoLocation = navigator.geolocation.getCurrentPosition((pos) => {
    //   lat = pos.coords.latitude;
    //   lng = pos.coords.longitude;
    //   console.log('lat:', lat, 'lng:', lng);
    // });
    // let lat = geoLocation.coords.latitude || 37.774929;
    // let lng = geoLocation.coords.latitude || -122.419416;

    return (
      <div>
        {/* <h3>Latitude: {curLat},  Longitude: {curLng}</h3> */}
        <div className="searchBlock">
          <form onSubmit={(e) => this.handleSearch(e)}>
            <input type="text" className="searchBar" ref="input" placeholder="please enter address/zipcode" required />
            <button className="searchBtn">Search</button>
          </form>
        </div>
        {/* <button onClick={}>Go</button> */}
        <Gmaps
          width={'600px'}
          height={'400px'}
          lat={lat}
          lng={lng}
          zoom={2}
          loadingMessage={'Be happy'}
          params={{v: '3.exp', key: process.env.API_KEY}}
          onMapCreated={this.onMapCreated}>
          <Marker
            lat={lat}
            lng={lng}
            draggable={true}
            onDragEnd={this.onDragEnd} />
          </Gmaps>
        </div>
      );
    }

  }
