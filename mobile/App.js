import React from "react";
// mobile/App.js

import "react-native-gesture-handler";

import { StatusBar } from "react-native";
import "./src/i18n";
import { Provider } from "react-redux";
import store, { persistor } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import RootNavigator from "./src/navigation/RootNavigator";
import useNetInfoQueue from "./src/hooks/useNetInfoQueue";

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
