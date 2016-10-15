import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher'

let currentPos = {};

class MapStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch (action.type) {
        case 'GLOBAL_POSITION':
        currentPos = action.payload.pos;
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
}

export default new MapStore;
