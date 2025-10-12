import React from 'react';
import { StatusBar } from 'react-native';
import './i18n';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigator from './navigation/RootNavigator';
import useNetInfoQueue from './hooks/useNetInfoQueue';

function Bootstrap() {
  useNetInfoQueue();
  return <RootNavigator />;
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" />
        <Bootstrap />
      </PersistGate>
    </Provider>
  );
}
