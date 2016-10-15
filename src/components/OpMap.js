import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';
import OpMapStore from '../stores/OpMapStore'
import MapActions from '../actions/MapActions';

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      lat: OpMapStore.getOpLat(),
      lng: OpMapStore.getOpLng()
    }
    this._onChange= this._onChange.bind(this);
  }

  componentWillMount () {
    OpMapStore.startListening(this._onChange)
  }

  componentWillUnmount () {
    OpMapStore.stopListening(this._onChange)
  }

  _onChange () {
    this.setState({
      lat: OpMapStore.getOpLat(),
      lng: OpMapStore.getOpLng()
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

  onDragEnd(e) {
    let pos = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }
    MapActions.globalOpPosition(pos);
    // console.log('pos', pos);
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
          params={{v: '3.exp', key: 'AIzaSyCoAuYhajAzi3Sn7ciZQVaUGe2-rYqN7bU'}}
          onMapCreated={this.onMapCreated}
          zoomControl = {true}
          streetViewControl = {true}
          mapTypeControl = {true}>
          <Marker
            lat={lat}
            lng={lng}
            draggable={true}
            onDragEnd={this.onDragEnd} />
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
