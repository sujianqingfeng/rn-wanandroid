import AppWithNavigationState from './src'
import getStore from "./src/store";
import React from 'react';
import { connect, Provider } from "react-redux";

const store = getStore();


export default class App extends React.PureComponent {


  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>

    );
  }
}
