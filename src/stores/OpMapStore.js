import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher'

let opLat = '';
let opLng = '';

class OpMapStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch (action.type) {
        case 'GLOBAL_POSITION':
          let currentPos = action.payload.pos;
          opLat = 0-currentPos.lat;
          opLng = currentPos.lng + 180 ;
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

  // getCurrentPosition() {
  //   return currentPos;
  // }

  getOpLat() {
    return opLat;
  }

  getOpLng() {
    return opLng;
  }

  // getDefaultPosition(){
  //   return defaultPos
  // }
}

export default new OpMapStore;
