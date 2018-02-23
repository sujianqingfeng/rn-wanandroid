import AppNavigator from './route'
import React, { Component } from 'react';
import { addNavigationHelpers } from "react-navigation";
import { connect } from "react-redux";

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
