import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';
import MapStore from '../stores/MapStore';
import MapActions from '../actions/MapActions';

export default class Map extends Component {
  constructor() {
    super();
    let defPos = MapStore.getDefaultPosition()
    this.state = {
      lat: defPos.lat,
      lng: defPos.lng,
      curLat: defPos.lat,
      curLng: defPos.lng
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
      lng: defPos.lng,
      curLat: defPos.lat,
      curLng: defPos.lng
    }, console.log('this.state', this.state))
    //  MapActions.globalPosition(defPos);
   }

  onDragEnd(e) {
    let pos = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }
    this.setState({
      curLat: e.latLng.lat(),
      curLng: e.latLng.lng()
    })
    MapActions.globalPosition(pos);
  }

  onCloseClick() {
    console.log('onCloseClick');
  }

  onClick(e) {
    console.log('onClick', e);
  }

  render() {
    let { lat, lng , curLat , curLng } = this.state;
    return (
      <div>
        <h4>Latitude: {curLat} Longitude: {curLng}</h4>
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
          mapTypeControl = {true}
          >
          <Marker
            lat={lat}
            lng={lng}
            draggable={true}
            onDragEnd={this.onDragEnd}
            icon ={'http://www.clipartbest.com/cliparts/ncE/yzn/ncEyznjpi.gif'} />
          </Gmaps>
        </div>
      );
    }

  }
