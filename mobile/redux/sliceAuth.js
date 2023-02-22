/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

const user = SecureStore.getItemAsync('user');

const initialState = user ? {
  isLoggedIn: true, refresh: 0, user,
}
  : {
    isLoggedIn: false, refresh: 0, user: null,
  };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.refresh = 0;
    },
    refresh: (state) => {
      state.refresh += 1;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  login,
  logout,
  refresh,
  updateUser,
} = authSlice.actions;
const { reducer } = authSlice;
export default reducer;
