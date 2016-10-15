import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import MapActions from '../actions/MapActions'

export default class SearchBar extends Component {

    handleSearch (e) {
      e.preventDefault()
      let {input} = this.refs
      let address = input.value
      MapActions.searchAddress(address)
    }

  render () {
    return (
      <div className="searchBlock">
        <form onSubmit={(e) => this.handleSearch(e)}>
          <input type="text" className="searchBar" ref="input" placeholder="enter location" required />
          <Button primary>Search</Button>
        </form>
      </div>
    )
  }
}
