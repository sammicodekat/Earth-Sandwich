import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';
import MapStore from '../stores/MapStore'
import MapActions from '../actions/MapActions';

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      lat: MapStore.getOpLat(),
      lng: MapStore.getOpLng()
    }
    this._onChange= this._onChange.bind(this);
  }

  componentWillMount () {
    MapStore.startListening(this._onChange)
  }

  componentWillUnmount () {
    MapStore.stopListening(this._onChange)
  }
  _onChange () {
    this.setState({
      lat: MapStore.getOpLat(),
      lng: MapStore.getOpLng()
    })
  }

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    })
  }
  onCloseClick() {
    console.log('onCloseClick');
  }

  onClick(e) {
    console.log('onClick', e);
  }

  render() {
    let { lat, lng } = this.state;

    return (
      <div>
        {/* <h3>Latitude: {curLat},  Longitude: {curLng}</h3> */}
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
            draggable={false}
            />
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
