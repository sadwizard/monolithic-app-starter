import { List, Map } from 'immutable';
import _ from 'lodash';

// initial state for reducer
export const initialState = {
  items: new List(),
}




export function templateAction(param) {
  // name of param will be change
  // exactly the same param name in reducer state
  return { type: "templateAction" , items: param };
};

export function templateThunkAction(param) {
  return (dispatch, getState) => {
    // const state = getState();
    // some async operations
    return dispatch(templateAction('some'))
  }
};
