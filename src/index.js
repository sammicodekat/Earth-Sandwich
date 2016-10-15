
import React from 'react'
import { render } from 'react-dom'
import {Router,Route,IndexRoute,browserHistory} from 'react-router'
import Layout from './components/Layout'

import EarthSandwitch from './components/EarthSandwitch'

render(
  <Router history ={browserHistory}>
    <Route path ='/' component ={Layout}>
      <Route path ='/earth-sandwitch' component ={EarthSandwitch}/>
      {/* <Route path ='/imageanalyse' component={ImageAnalysePage}/> */}
    </Route>
  </Router>,
  document.getElementById('root')
);
