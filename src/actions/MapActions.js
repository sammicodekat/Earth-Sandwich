import AppDispatcher from '../AppDispatcher'

const MapActions = {
  globalPosition(pos) {
    console.log('pos in actions:', pos);
    AppDispatcher.dispatch({
      type: 'GLOBAL_POSITION',
      payload: { pos }
    })
  }
}

export default MapActions;
