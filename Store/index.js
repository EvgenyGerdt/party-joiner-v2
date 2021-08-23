import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './Reducers/authReducer';
import resetPasswordReducer from "./Reducers/resetPasswordReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  reset: resetPasswordReducer,
});
