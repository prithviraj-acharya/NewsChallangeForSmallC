/**
 * @format
 */
import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/redux/store/index';
LogBox.ignoreAllLogs();

const NewsChallangeForSmallC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => NewsChallangeForSmallC);
