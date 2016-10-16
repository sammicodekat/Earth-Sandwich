import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';
import { Segment , Label, Icon } from 'semantic-ui-react'

import OpMapStore from '../stores/OpMapStore'
import MapActions from '../actions/MapActions';
import OpPosition from './OpPosition'

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      lat: OpMapStore.getOpLat(),
      lng: OpMapStore.getOpLng()
    }
    this.onDragEnd = this.onDragEnd.bind(this);
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
    MapActions.globalOpPosition(pos)
  }

  render() {
    let { lat, lng } = this.state;
    return (
      <Segment raised inverted color='orange' tertiary>
         <Label attached='top right'>SANDWICH BOTTOM</Label>
        <OpPosition />
        <Gmaps
          width={'600px'}
          height={'400px'}
          lat={lat}
          lng={lng}
          zoom={2}
          loadingMessage={'Loading map...'}
          params={{v: '3.exp', key: process.env.API_KEY}}
          onMapCreated={this.onMapCreated}
          zoomControl = {true}
          streetViewControl = {true}
          mapTypeControl = {true}>
          <Marker
            lat={lat}
            lng={lng}
            draggable={true}
            onDragEnd={this.onDragEnd}
            icon ={'https://dl2.pushbulletusercontent.com/0zqKqnx6NSgRPEZpzIDlel8Jun40MKk5/back.png'} />
            />
            <Circle
              lat={lat}
              lng={lng}
              radius={500}
              onClick={this.onClick} />
          </Gmaps>
        </Segment>
      );
    }

  }
