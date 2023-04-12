/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

const user = SecureStore.getItemAsync('user');

const initialState = user ? {
  isLoggedIn: true, refresh: 0, id: user.id, token: user.token,
}
  : {
    isLoggedIn: false, refresh: 0, id: null, token: null,
  };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.refresh = 0;
      state.id = null;
      state.token = null;
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
