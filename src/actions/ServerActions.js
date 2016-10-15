import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  gotCoord(coord) {
    AppDispatcher.dispatch({
      type: 'GOT_COORD',
      payload: coord
    })
  }
}

export default ServerActions
