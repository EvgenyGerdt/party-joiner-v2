import {createStore, compose, applyMiddleware} from '@reduxjs/toolkit';
import {rootReducer} from './index';
import {composeWithDevTools} from 'remote-redux-devtools';

import thunk from "redux-thunk";

const initialState = {};
const middleWare = [thunk];

let composeEnhancers = compose;
let devToolsEnhancer = composeWithDevTools({
  realtime: true,
  port: 8000,
  hostname: 'localhost',
});

if (__DEV__) {
  composeEnhancers = devToolsEnhancer || compose;
}

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleWare)),
);

export default store;
