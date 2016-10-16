import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { List,Item, Image, Label, Icon } from 'semantic-ui-react'
import _ from 'lodash'

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
    let Places =''
    if(places){
      Places = places.map( place => {
        let { icon, name , id , reference , vicinity} = place ;
        const colors = [
          'red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue',
          'violet', 'purple', 'pink', 'brown']
        return (
          <Label as='a' color={_.sample(colors)} image key={id} onClick={this.searchDetail.bind(null,reference)}>
            <img src={icon} />
            {name}
            <Label.Detail>{vicinity}</Label.Detail>
          </Label>
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
