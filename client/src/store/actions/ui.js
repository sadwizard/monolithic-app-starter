import { List, Map } from 'immutable';
import _ from 'lodash';

// initial state for reducer
export const initialState = {
  items: new List(),
}


export function someAction(id, data) {
  return { type: "SET_LOADER", id, data };
};
