
import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

export default class Layout extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
