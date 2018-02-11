import { connect } from "react-redux";
import { addNavigationHelpers } from "react-navigation";
import React, { Component } from 'react';

import AppNavigator from './route'

const mapStateToProps = (state) => ({
    nav: state.nav
});
  
class AppNav extends Component<{}> {
    render() {
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        );
    }
  }
  
const AppWithNavigationState = connect(mapStateToProps)(AppNav);

export default AppWithNavigationState