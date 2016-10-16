import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { List,Item, Image, Label, Icon } from 'semantic-ui-react'

import ListStore from '../stores/ListStore'
import MapActions from '../actions/MapActions'

export default class FarList extends Component {
  constructor() {
    super();
    this.state={
      places: ListStore.getFarPlace()
    }
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount () {
    ListStore.startListening(this._onChange)
  }

  componentWillUnmount () {
    ListStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState({
      places: ListStore.getFarPlace()
    })
  }
  
  searchDetail(){
    MapActions.searchDetail(reference)
  }

  render() {
    let { places } = this.state
    let Places = ''

    if (places.length === 0) {
      Places = 'Nothing to show'
      console.log('places is empty')
    } else {
    // if(places){
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
