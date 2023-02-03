import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import store from './store';
import {
  login, logout, refresh, updateUser,
} from './sliceAuth';

export const serviceLogin = async (userData) => {
  try {
    store.dispatch(login(userData));
    await SecureStore.setItemAsync('user', JSON.stringify(userData));
    return true;
  } catch (err) {
    Alert.alert(err.error, err.message);
    return err;
  }
};

export const serviceLogout = async () => {
  store.dispatch(logout());
  await SecureStore.deleteItemAsync('user');
};

export const serviceRefresh = () => {
  store.dispatch(refresh());
};

export const serviceUpdateUser = (userData) => {
  store.dispatch(updateUser(userData));
};
