import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';
import { Segment , Label, Icon } from 'semantic-ui-react'

import MapStore from '../stores/MapStore';
import MapActions from '../actions/MapActions';
import Position from './Position'

export default class Map extends Component {
  constructor() {
    super();
    let defPos = MapStore.getDefaultPosition()
    this.state = {
      lat: defPos.lat,
      lng: defPos.lng
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

  _onChange() {
    let defPos = MapStore.getDefaultPosition()
    this.setState({
      lat: defPos.lat,
      lng: defPos.lng
    })
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

  render() {
    let { lat, lng } = this.state;
    return (
      <Segment raised inverted color='yellow' tertiary className="map">
         <Label attached='top left'>SANDWICH TOP</Label>
        <Position />
        <Gmaps
          width={'600px'}
          height={'400px'}
          lat={lat}
          lng={lng}
          zoom={4}
          loadingMessage={'Loading map...'}
          params={{v: '3.exp', key: process.env.API_KEY}}
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
            icon ={'https://dl2.pushbulletusercontent.com/ne5DjsVyfE8fGzVcVtKm3icoy0BA3VJ2/face.png'}
            animation = {'DROP'} />
        </Gmaps>
      </Segment>
    )
  }

}
