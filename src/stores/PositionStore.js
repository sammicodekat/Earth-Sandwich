import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';

let position = {};
let opPosition = {};

class PositionStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch (action.type) {
        case 'GLOBAL_POSITION':
          // let { pos } = action.payload;
          position = action.payload.pos;
          opPosition.lat = 0-action.payload.pos.lat
          opPosition.lng = action.payload.pos.lng+180
          this.emit('CHANGE');
          break;
        case 'GLOBAL_OP_POSITION':
          opPosition = action.payload.pos;
          position.lat = 0 -action.payload.pos.lat
          position.lng = action.payload.pos.lng-180
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

  getPosition(){
    return position
  }

  getOpPosition(){
    return opPosition
  }
}

export default new PositionStore;
