import AppDispatcher from '../AppDispatcher'
import API from '../API'

const MapActions = {
  globalPosition(pos) {
    AppDispatcher.dispatch({
      type: 'GLOBAL_POSITION',
      payload: { pos }
    })
    API.showCloseBy(pos);
  },

  globalOpPosition(pos) {
    AppDispatcher.dispatch({
      type: 'GLOBAL_OP_POSITION',
      payload: { pos }
    })
    API.showFarPlace(pos);
  },

  showOpList(pos) {
    API.showFarPlace(pos);
  },

  showList(pos) {
    API.showCloseBy(pos);
  },

  searchAddress(address){
    API.searchAddress(address)
  },

  searchDetail(detail){
    API.searchDetail(detail)
  }
}

export default MapActions;
