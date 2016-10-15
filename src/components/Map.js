import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';

import MapActions from '../actions/MapActions';

// var coords = {
//   lat: 51.5258541,
//   lng: -0.08040660000006028
// };

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      lat: 37.774929,
      lng: -122.419416,
      curLat: 37.639781,
      curLng: -121.800068
    }
    this.onDragEnd = this.onDragEnd.bind(this);
  }



  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    })
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

  onDragEnd(e) {
    console.log('onDragEnd', e);
    // console.log('lat:', this.state.lat, 'lng:', this.state.lng);
    console.log('e.latLng.lat()', e.latLng.lat());
    console.log('e.latLng.lng()', e.latLng.lng());

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
        <input type="number"/>
        <input type="number"/>
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
          {/* <InfoWindow
            lat={lat}
            lng={lng}
            content={'Hello, React :)'}
            onCloseClick={this.onCloseClick} /> */}
            <Circle
              lat={lat}
              lng={lng}
              radius={500}
              onClick={this.onClick} />
          </Gmaps>
        </div>
      );
    }

  }
