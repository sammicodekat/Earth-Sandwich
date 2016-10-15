import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher'

// let currentPos = {};
let defaultPos = {
  lat: 37.774929,
  lng: -122.419416
}
// let opLat = '';
// let opLng = '';

class MapStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch (action.type) {
        case 'GLOBAL_OP_POSITION':
          let currentPos = action.payload.pos;
          // let opLat = 0-currentPos.lat;
          // let opLng = currentPos.lng + 180 ;
          defaultPos = {
            lat: 0-currentPos.lat,
            lng: currentPos.lng + 180
          }
          this.emit('CHANGE');
          break;
        case 'GOT_COORD':
          defaultPos = action.payload;
          console.log( 'defaultPos', defaultPos )
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

  getDefaultPosition(){
    return defaultPos
  }
}

export default new MapStore;
