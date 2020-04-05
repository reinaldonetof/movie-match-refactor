import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from './src/Reducers';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import AppInitial from './AppInitial';

const persistConfig = {
  key:'root',
  storage,
  whitelist:['valueCBox','video','lyrics', 'save']
};

const persistedReducer = persistReducer(persistConfig, Reducers);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <AppInitial />
      </PersistGate>
    </Provider>
    )
  }
}


console.disableYellowBox = true;