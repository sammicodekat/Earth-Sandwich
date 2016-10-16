import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { Segment , Label, Icon } from 'semantic-ui-react'

import PositionStore from '../stores/PositionStore'

export default class OpPosition extends Component {
  constructor() {
    super();
    let { lat, lng } = PositionStore.getOpPosition();
    this.state = {
      lat,
      lng
    }
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount () {
    PositionStore.startListening(this._onChange)
  }

  componentWillUnmount () {
    PositionStore.stopListening(this._onChange)
  }

  _onChange() {
    let { lat, lng } = PositionStore.getOpPosition();
    this.setState({
      lat,
      lng
    })
    console.log('state in OpPosition:', this.state);
  }

  render() {
    return (
      <div>pos</div>
    )
  }
}
