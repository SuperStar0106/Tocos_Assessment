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

export function* getTransactionsSaga(action: any) {
  try {
    const result: ResponseGenerator = yield call(
      async () => await mainApiInstance.get('/api/v1/transactions')
    );

    if (result) {
      yield put(AppActions.transaction.getTransactionsSuccess(result.data));
    }
  } catch (error: any) {
    yield put(AppActions.transaction.getTransactionsError(error.response.data.message));
  }
}

export function* createTransactionSaga(action: any) {
  try {
    const { next, ...body } = action.payload;
    const result: ResponseGenerator = yield call(
      async () => await mainApiInstance.post('/api/v1/transactions', body)
    );

    if (result) {
      next();
      yield put(AppActions.transaction.createTransactionSuccess(result.data));
    }
  } catch (error: any) {
    yield put(AppActions.transaction.createTransactionError(error.response.data.message));
  }
}