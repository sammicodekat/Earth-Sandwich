const { Column, Row } = Grid
import { Grid } from 'semantic-ui-react'
import React, { Component } from 'react'
import Map from './Map'
import OpMap from './OpMap'
import CloseByList from './CloseByList'
import FarList from './FarList'
export default class EarthSandwitch extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Grid centered  textAlign='center' padded>
        <Row columns={2}>
          <Column textAlign='center'><h4>Top of Sandwich</h4><Map /><CloseByList/></Column>
          <Column textAlign='center'><h4>Bottom of Sandwich</h4><OpMap /><FarList/></Column>
        </Row>
      </Grid>
    )
  }
}
