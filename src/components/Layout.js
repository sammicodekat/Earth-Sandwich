
import { Menu, Segment, Label, Icon } from 'semantic-ui-react'
import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import SearchBar from './SearchBar'

export default class Layout extends Component {
  constructor() {
    super();
  }

  render() {
    let path = this.props.location.pathname
    return (
      <div>
        <Menu inverted color ='blue' className="menu" stackable>
          <Menu.Item>
            <img src='https://dl2.pushbulletusercontent.com/q0sPSO1AGwZRM7vWxaEBeGwBmilpHdR4/logo.png' />
          </Menu.Item>
          <Menu.Item>
            <h1>EarthSandwich</h1>
          </Menu.Item>
          <Menu.Item className={classNames({active: path === '/'})}><Link to="/">Create Your Sandwich</Link></Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item> <SearchBar /></Menu.Item>
          </Menu.Menu>
        </Menu>
        <div className="container">
          {this.props.children}
        </div>
        <Segment inverted color='blue' tertiary textAlign = 'center'>
          {/* <Label as='a' image>
            <img src='https://dl2.pushbulletusercontent.com/q0sPSO1AGwZRM7vWxaEBeGwBmilpHdR4/logo.png' />
            Made by Donovan & Sammi
          </Label> */}
          <Icon name='warning sign' />
          WARNING: This sandwich may contain dairy, soy, wheat, tree nuts, fish, coconut, eggs, peanuts, shellfish, fruit, rice, garlic, oats, meat, hot peppers, gluten, tartrazine, sulfites, penicillin, dilantin, cats, cosmetics, latex, water, salt, fungicide, and/or mayonnaise
        </Segment>
      </div>
    )
  }
}
