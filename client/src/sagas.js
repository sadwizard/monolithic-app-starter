import { takeEvery } from 'redux-saga/effects'

import initApp from 'containers/App/sagas/initApp';

function* rootSaga() {
  yield takeEvery('INIT_APP', initApp);
}

export default rootSaga;