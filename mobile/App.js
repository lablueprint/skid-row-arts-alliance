/* eslint-disable global-require */
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppSelector from './Components/AppSelector';

export default function App() {
  return (
    <Provider store={store}>
      <AppSelector />
    </Provider>
  );
}
