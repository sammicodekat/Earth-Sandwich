
import React, { Component } from 'react'
import Map from './Map'
import OpMap from './OpMap'
export default class EarthSandwitch extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
      <h1>Earth Sandwitch</h1>
      <Map />
      <h4>The opposite side</h4>
      <OpMap />
      </div>
    )
  }
}
