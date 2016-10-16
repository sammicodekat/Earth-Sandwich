const { Column, Row } = Grid
import { Grid } from 'semantic-ui-react'
import React, { Component } from 'react'
import Map from './Map'
import OpMap from './OpMap'
import CloseByList from './CloseByList'
export default class EarthSandwitch extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Grid>
        <Row columns={2}>
          <Column ><h4>Your location</h4><Map /><CloseByList/></Column>
          <Column><h4>The opposite side</h4><OpMap /></Column>
        </Row>
      </Grid>
    )
  }
}
