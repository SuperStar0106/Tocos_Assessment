import { AppActions } from 'store';

import { call, put } from 'redux-saga/effects';

import { mainApiInstance } from 'utils/ApiInstance';

interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export function* getUsersSaga(action: any) {
  try {
    const result: ResponseGenerator = yield call(
      async () => await mainApiInstance.get('/api/v1/users')
    );

    if (result) {
      yield put(AppActions.user.getUsersSuccess(result.data));
    }
  } catch (error: any) {
    yield put(AppActions.user.getUsersError(error.response.data.message));
  }
}

export function* createUserSaga(action: any) {
  try {
    const result: ResponseGenerator = yield call(
      async () => await mainApiInstance.post('/api/v1/users', action.payload)
    );

    if (result) {
      yield put(AppActions.user.createUserSuccess(result.data));
    }
  } catch (error: any) {
    yield put(AppActions.user.createUserError(error.response.data.message));
  }
}