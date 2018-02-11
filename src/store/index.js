import {createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import getRootReducer from '../reducers'
import AppNavigator from '../route'

const middlewares = [thunk.withExtraArgument()];

const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};
  

export default function getStore(){
    return createStore(
        getRootReducer(navReducer),
        undefined,
        applyMiddleware(...middlewares)
    )
}


