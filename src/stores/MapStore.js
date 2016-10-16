import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher'

let defaultPos = {
  lat: 37.774929,
  lng: -122.419416
}

class MapStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch (action.type) {
        case 'GLOBAL_OP_POSITION':
          let { pos } = action.payload;
          defaultPos = {
            lat: 0-pos.lat,
            lng: pos.lng + 180
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
  
  getDefaultPosition(){
    return defaultPos
  }
}

export default new MapStore;
