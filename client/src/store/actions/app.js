import { List, Map } from 'immutable';
import _ from 'lodash';


export const initialState = {
  loaders: new Map({
    loadApp: true,
  }),
  messages: new List(),
  token: null
}






export function initApp(token) {
  return { type: "initApp" , token };
};

export function setMessage(message) {
  return { type: "setMessage", message };
};

export function removeMessage(id) {
  return { type: "removeMessage", id };
};

export function setLoader(id, data) {
  return { type: "setLoader", id, data };
};
