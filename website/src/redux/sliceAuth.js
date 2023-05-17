/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

const admin = JSON.parse(localStorage.getItem('admin'));

const initialState = admin ? { id: admin.id, token: admin.token }
  : { id: null, token: null };

export const sliceAuth = createSlice({
  name: 'sliceAuth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.token = action.payload.token;
      localStorage.setItem('admin', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.id = null;
      state.token = null;
      localStorage.removeItem('admin');
    },
  },
});

export const { login, logout } = sliceAuth.actions;

export const isTokenExpired = (token) => {
  const decodedToken = jwt_decode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

export default sliceAuth.reducer;
