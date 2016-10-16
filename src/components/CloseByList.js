import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { List,Item, Image, Label, Icon } from 'semantic-ui-react'

import MapStore from '../stores/MapStore'

export default class CloseByList extends Component {
  constructor() {
    super();
    this.state={
      places: MapStore.getCloseBy()
    }
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount () {
    MapStore.startListening(this._onChange)
  }

  componentWillUnmount () {
    MapStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState({
      places: MapStore.getCloseBy()
    })
  }

  render() {
    let { places } = this.state
    let Places =''
    if(places){
       Places = places.map( place => {
        let { icon, name , id , reference , vicinity} = place ;
        return (
          <List.Item key = {id}>
            <Image avatar src={icon} />
            <List.Content>
              <List.Header>{name}</List.Header>
              <List.Description>{vicinity}</List.Description>
            </List.Content>
          </List.Item>
        )
      })
    }

    return (
      <List relaxed animated verticalAlign='middle'>
        {Places}
      </List>
    )

  }

}
