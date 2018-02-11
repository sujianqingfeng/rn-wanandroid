import React, { Component } from 'react';
import { Provider, connect } from "react-redux";

import AppNavigator from './src/route'
import getStore from "./src/store";
import AppWithNavigationState from './src'

const store = getStore();

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

