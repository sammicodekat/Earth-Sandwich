import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { List,Item, Image, Label, Icon } from 'semantic-ui-react'

import ListStore from '../stores/ListStore'

export default class CloseByList extends Component {
  constructor() {
    super();
    this.state={
      places: ListStore.getCloseBy()
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
      places: ListStore.getCloseBy()
    })
  }

  render() {
    let { places } = this.state
    let Places = ''
    if (places.length === 0) {
      Places = (
        <h4>You Are in the Middle of Nowhere!</h4>
      )
    } else {
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
      <List relaxed animated verticalAlign='middle' className='list'>
        <h3>Places Closest to You:</h3>
        {Places}
      </List>
    )

  }

}
