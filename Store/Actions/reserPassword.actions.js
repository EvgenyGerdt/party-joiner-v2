import {
  SEND_CODE_FAIL,
  SEND_CODE_REQUEST,
  SEND_CODE_SUCCESS,
  CHECK_CODE_REQUEST,
  CHECK_CODE_SUCCESS,
  CHECK_CODE_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL
} from "./types";
import instance from "../../Config/axios.config";

export const resetCode = (to, username) => async (dispatch) => {
  dispatch({type: SEND_CODE_REQUEST});

  await instance
      .post('/api/auth/send_code', {to, username})
      .then(() => dispatch({type: SEND_CODE_SUCCESS, payload: to}))
      .catch(() => dispatch({type: SEND_CODE_FAIL}));
};

export const checkCode = (code) => async (dispatch) => {
  dispatch({type: CHECK_CODE_REQUEST});

  await instance
      .post('/api/auth/check_code', {code})
      .then(() => dispatch({type: CHECK_CODE_SUCCESS}))
      .catch(() => dispatch({type: CHECK_CODE_FAIL}));
};

export const resetPassword = (email, password) => async (dispatch) => {
  dispatch({type: RESET_PASSWORD_REQUEST});

  await instance
      .post('/api/auth/reset_password', {email, password})
      .then(() => dispatch({type: RESET_PASSWORD_SUCCESS}))
      .catch(() => dispatch({type: RESET_PASSWORD_FAIL}));
}
