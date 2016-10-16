import AppDispatcher from '../AppDispatcher'
import API from '../API'

const MapActions = {
  globalPosition(pos) {
    console.log('pos in actions:', pos);
    AppDispatcher.dispatch({
      type: 'GLOBAL_POSITION',
      payload: { pos }
    })
    API.showCloseBy(pos);
  },

  globalOpPosition(pos) {
    console.log('pos in actions:', pos);
    AppDispatcher.dispatch({
      type: 'GLOBAL_OP_POSITION',
      payload: { pos }
    })

  },

  searchAddress(address){
    API.searchAddress(address)
  }
}

export default MapActions;
