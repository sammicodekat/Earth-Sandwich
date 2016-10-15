import AppDispatcher from '../AppDispatcher'
import API from '../API'

const MapActions = {
  globalPosition(pos) {
    console.log('pos in actions:', pos);
    AppDispatcher.dispatch({
      type: 'GLOBAL_POSITION',
      payload: { pos }
    })
  },
  searchAddress(address){
    API.searchAddress(address)
  }
}

export default MapActions;
