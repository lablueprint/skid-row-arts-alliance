/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

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
      state.refresh = 0;
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.authHeader = {
        Authorization: `Bearer ${action.payload.token}`,
      };
      SecureStore.setItemAsync('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.refresh = 0;
      state.id = null;
      state.token = null;
      state.authHeader = null;
      SecureStore.deleteItemAsync('user');
    },
    refresh: (state) => {
      state.refresh += 1;
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

export const isTokenExpired = (token) => {
  const decodedToken = jwt_decode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};
