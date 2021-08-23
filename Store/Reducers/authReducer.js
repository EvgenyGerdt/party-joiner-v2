import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL, USER_SUCCESS, USER_FAIL, USER_REQUEST,
} from '../Actions/types';

const initialState = {
  isAuthenticated: false,
  isExists: false,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        isExists: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isExists: false,
      }
    case USER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
    case REGISTER_FAIL:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isExists: true,
      };
    default:
      return state;
  }
}
