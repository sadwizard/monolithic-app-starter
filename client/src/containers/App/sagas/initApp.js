import { call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import Api from 'api/api';
import Cookies from 'js-cookie';

import { setLoader } from 'containers/App/actions';

export default function* initApp(action) {
   try {
      const api = new Api();

      const token = Cookies.get('token');

      yield put(setLoader('loadApp', true));

   } catch (err) {
      console.log(err);
   }
}