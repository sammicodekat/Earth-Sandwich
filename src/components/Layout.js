
import { Menu } from 'semantic-ui-react'
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
          <h1>EarthSandwich</h1>
        </Menu.Item>
        <Menu.Item className={classNames({active: path === '/'})}><Link to="/">Create Your Sandwich</Link></Menu.Item>
        <Menu.Menu position='right'>
        <Menu.Item> <SearchBar /></Menu.Item>
        </Menu.Menu>
      </Menu>
        {this.props.children}
      </div>
    )
  }
}
