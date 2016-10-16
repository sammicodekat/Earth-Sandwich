import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher'


let closeByPlaces = []
let farPlaces = []

class ListStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch (action.type) {
        case 'GOT_PLACES':
        closeByPlaces = action.payload;
        this.emit('CHANGE');
        break;
        case 'GOT_FAR_PLACES':
        farPlaces = action.payload;
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

  getCloseBy(){
    return closeByPlaces
  }
  getFarPlace(){
    return farPlaces
  }
}

export default new ListStore;
