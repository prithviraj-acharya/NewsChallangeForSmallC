import {all} from 'redux-saga/effects';
import AUTH_SAGA from './AuthSaga';

function* RootSaga() {
  yield all([...AUTH_SAGA.source]);
}

export default RootSaga;
