import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher'

let currentPos = {};
let opLat = '';
let opLng = '';

class MapStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch (action.type) {
        case 'GLOBAL_POSITION':
        currentPos = action.payload.pos;
        opLat = 0-currentPos.lat;
        opLng = currentPos.lng + 180 ;
        console.log('currentPos in store:', currentPos);
        this.emit('CHANGE');
        break;


      }
    })
  }

  startListening(cb) {
    this.on('CHANGE',cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE',cb)
  }

  getCurrentPosition() {
    return currentPos;
  }
  getOpLat() {
    return opLat;
  }
  getOpLng() {
    return opLng;
  }
}

export default new MapStore;
