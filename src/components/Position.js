import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { Segment , Label, Icon } from 'semantic-ui-react'

import PositionStore from '../stores/PositionStore'

export default class Position extends Component {
  constructor() {
    super();
    let { lat, lng } = PositionStore.getPosition();
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
    let { lat, lng } = PositionStore.getPosition();
    this.setState({
      lat,
      lng
    })
  }

  render() {
    let { lat, lng } = this.state
    return (
      <div className="left">
      <Label as='a' color='blue' image>
        <Icon name='map pin' />
        Latitude:
        <Label.Detail>{lat}</Label.Detail>
      </Label>
      <Label as='a' color='red' image>
        <Icon name='map pin' />
        Longitude:
        <Label.Detail>{lng}</Label.Detail>
      </Label>
    </div>
    )
  }
}
