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
          var { lat, lng } = action.payload.pos;
          opLat = 0 - lat;
          opLng = 180 + lng;
          this.emit('CHANGE');
          break;
        case 'GOT_COORD':
          var { lat, lng } = action.payload;
          opLat = 0 - lat;
          opLng = 180 + lng;
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

  getOpLat() {
    return opLat;
  }

  getOpLng() {
    return opLng;
  }
}

export default new OpMapStore;
