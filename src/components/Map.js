import React, { Component } from 'react'
/* global google */
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

console.log('window.google: ', window.google);


const SimpleMap = (props) => {
  /*
  PROPS:
  markers = array
  conatinerElementProps
  */

  const renderMarkers = () => {(
    props.markers.map((marker, i) => {
      // all markers: animation, attribution, clickable, cursor, draggable, icon, label, opacity, options, place, position, shape, title, visible, zIndex
      <Marker {...marker} onRightclick={() => props.onMarkerRightclick(index)} />
    })
  )};

  const renderGoogleMap = () => (
    <GoogleMap
      ref={(map) => console.log(map)}
      defaultZoom={3}
      defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
      onClick={props.onMapClick}
      >
      {renderMarkers()}
    </GoogleMap>
  )

  return (
    <section style={{height: "100%"}}>
      <GoogleMapLoader
        query={{ libraries: 'geometry, drawing, places, visualization' }}
        containerElement={
          <div {...props.containerElementProps} style={{ height: "100%" }} />
        }
        googleMapElement={renderGoogleMap()}
        />
    </section>
  )
};

export default SimpleMap;
