import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  gotCoord(coord) {
    AppDispatcher.dispatch({
      type: 'GOT_COORD',
      payload: coord
    })
  },
  gotPlaces(results) {
    AppDispatcher.dispatch({
      type: 'GOT_PLACES',
      payload: results
    })
  },
  gotFarPlaces(results) {
    AppDispatcher.dispatch({
      type: 'GOT_FAR_PLACES',
      payload: results
    })
  }
}

export default ServerActions
