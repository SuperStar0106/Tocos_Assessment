//node_modules
//slices
import { AppActions } from "store";
//sagas
import { createUserSaga, getUsersSaga } from "./user.saga";

import { all, takeLatest } from "redux-saga/effects";
import { createTransactionSaga, getTransactionsSaga } from "./transaction.saga";

//sagas
function* rootSaga() {
  //currency
  yield all([
    takeLatest(AppActions.user.getUsers.type, getUsersSaga),
    takeLatest(AppActions.user.createUser.type, createUserSaga),
    takeLatest(AppActions.transaction.getTransactions.type, getTransactionsSaga),
    takeLatest(AppActions.transaction.createTransaction.type, createTransactionSaga)
  ]);
}

export default rootSaga;
