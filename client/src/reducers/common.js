import { List, Map } from 'immutable';
import _ from 'lodash';


const initialState = {
  loaders: new Map({
    loadApp: true,
  }),
  messages: new List(),
}


export default function(state = initialState , action){
  if (action.type === 'SET_MESSAGE') {
    let messages = state.messages;
    if (action.message !== null && typeof action.message === 'object') {
      action.message.id = Math.round(Math.random() * 10000);
      messages = state.messages.push(action.message);
    } else if (action.message === null) {
      messages = new List([]);
    }

    return Object.assign({} , state, { messages });
  }

  return state;
}