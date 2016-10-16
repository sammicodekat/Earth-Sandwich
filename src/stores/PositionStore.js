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
          console.log('position', position);
          this.emit('CHANGE');
          break;
        case 'GLOBAL_OP_POSITION':
          opPosition = action.payload.pos;
          console.log( 'opPosition', opPosition )
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
