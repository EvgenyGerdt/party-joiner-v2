import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_REQUEST, USER_SUCCESS, USER_FAIL,
} from "./types";

import instance from "../../Config/axios.config";

export const login = (username, password) => async (dispatch) => {
  dispatch({type: LOGIN_REQUEST});

  await instance
      .post('/api/auth/login', {username, password})
      .then((res) => {
        dispatch({type: LOGIN_SUCCESS, payload: res.data});
      })
      .catch((err) => {
        dispatch({type: LOGIN_FAIL, payload: err.message});
      })
};

export const register = (username, email, password, secretWord) => async (dispatch) => {
  dispatch({type: REGISTER_REQUEST});

  await instance
      .post('/api/auth/register', {username, email, password, secretWord})
      .then((res) => {
        dispatch({type: REGISTER_SUCCESS, payload: res.data})
      })
      .catch((err) => {
        dispatch({type: REGISTER_FAIL, payload: err.message});
      })
};

export const load = (id) => async (dispatch) => {
  dispatch({type: USER_REQUEST});

  await instance
      .get(`/api/user/${id}`)
      .then((res) => {
        dispatch({type: USER_SUCCESS, payload: res.data})
      })
      .catch((err) => {
        dispatch({type: USER_FAIL, payload: err.message});
      })
}

export const logout = () => {
  return dispatch => {
    dispatch({type: LOGOUT});
  }
};
