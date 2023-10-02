import { createSlice } from '@reduxjs/toolkit';
import { ITransaction } from 'types';

type StateType = {
  transactions: ITransaction[];
  gettingTransactions: boolean;
  gotTransactions: boolean;
  creatingTransaction: boolean;
  createdTransaction: boolean,
  errors: string[];
};

const initialState: StateType = {
  transactions: [],
  gettingTransactions: false,
  gotTransactions: false,
  creatingTransaction: false,
  createdTransaction: false,
  errors: [],
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: initialState,
  reducers: {
    /**
     * get transactions
     */
    getTransactions(state: StateType) {
      state.gettingTransactions = true;
      state.gotTransactions = false;
    },
    getTransactionsSuccess(state, action) {
      state.gettingTransactions = false;
      state.gotTransactions = true;
      const { result } = action.payload;
      state.transactions = result;
    },
    getTransactionsError(state, action) {
      state.gettingTransactions = false;
      state.gotTransactions = false;
      state.errors = [...state.errors, ...action.payload];
    },

    createTransaction(state: StateType, action) {
      state.creatingTransaction = false;
      state.createdTransaction = false;
    },
    createTransactionSuccess(state, action) {
      state.creatingTransaction = false;
      state.createdTransaction = true;
      const { result } = action.payload;
      state.transactions = [...state.transactions, result];
    },
    createTransactionError(state, action) {
      state.creatingTransaction = false;
      state.createdTransaction = false;
      state.errors = [...state.errors, ...action.payload];
    },

    resetErrors(state) {
      state.errors = [];
    },
  },
});

export const reducer = transactionSlice.reducer;
export const actions = transactionSlice.actions;
