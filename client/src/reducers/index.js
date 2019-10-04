import { combineReducers } from 'redux';
import auth from './auth';
import common from './common';
import modal from './modal';


const dataApp = combineReducers({
	auth,
	common,
	modal,
});

export default dataApp;