import { createSlice } from '@reduxjs/toolkit';
import { IUser } from 'types';

type StateType = {
  users: IUser[];
  gettingUsers: boolean;
  gotUsers: boolean;

  creatingUser: boolean,
  createdUser: boolean,
  errors: string[];
};

const initialState: StateType = {
  users: [],
  gettingUsers: false,
  gotUsers: false,
  creatingUser: false,
  createdUser: false,
  errors: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    /**
     * get users
     */
    getUsers(state: StateType) {
      state.gettingUsers = true;
      state.gotUsers = false;
    },
    getUsersSuccess(state, action) {
      state.gettingUsers = false;
      state.gotUsers = true;
      const { result } = action.payload;
      state.users = result;
    },
    getUsersError(state, action) {
      state.gettingUsers = false;
      state.gotUsers = false;
      state.errors = action.payload;
    },

    createUser(state: StateType, action) {
      state.creatingUser = false;
      state.createdUser = false;
    },
    createUserSuccess(state, action) {
      state.creatingUser = false;
      state.createdUser = true;
      const { result } = action.payload;
      state.users = [...state.users, result];
    },
    createUserError(state, action) {
      state.creatingUser = false;
      state.createdUser = false;
      state.errors = [...state.errors, ...action.payload];
    },

    resetErrors(state) {
      state.errors = [];
    },
  },
});

export const reducer = userSlice.reducer;
export const actions = userSlice.actions;
