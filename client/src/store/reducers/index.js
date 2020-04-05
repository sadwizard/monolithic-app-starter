import { combineReducers } from 'redux';
import storeItems from 'store/actions';
import _map from 'lodash/map';
import _merge from 'lodash/merge';

const storeStates = storeItems.states;
const reducers = {};

_map(storeStates, (item, key) => {
	reducers[key] = generateReducer(item);
})

const dataApp = combineReducers(reducers);

export default dataApp;


function generateReducer({ state: storeState, methodsKeys }) {
	return function (state = storeState, action) {
		if ((methodsKeys || []).includes(action.type)) {
			return applyMutationReducer(state, action)
		}

		return state;
	}
}

function applyMutationReducer(state, action) {
	let result = state;
	_map(action, (item, key) => {
		if (key !== 'type') {
			const change = {}
			if (typeof item === 'function') {
				change[key] = item(state);
				result = _merge(result, change)
			} else {
				change[key] = item;
				result = _merge(result, change)
			}
		}
	})

	return Object.assign({}, result);
}
