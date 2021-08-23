import {
  SEND_CODE_REQUEST,
  SEND_CODE_SUCCESS,
  SEND_CODE_FAIL,
  CHECK_CODE_REQUEST,
  CHECK_CODE_SUCCESS,
  CHECK_CODE_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} from '../Actions/types';

const initialState = {
  sending: false,
  isSend: false,
  checking: false,
  isChecked: false,
  isChanged: false,
  email: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEND_CODE_REQUEST:
      return {
        ...state,
        sending: true,
      };
    case SEND_CODE_SUCCESS:
      return {
        ...state,
        sending: false,
        isSend: true,
        email: action.payload,
      };
    case SEND_CODE_FAIL:
      return {
        ...state,
        sending: false,
        isSend: false,
      }
    case CHECK_CODE_REQUEST:
      return {
        ...state,
        checking: true,
      };
    case CHECK_CODE_SUCCESS:
      return {
        ...state,
        checking: false,
        isChecked: true,
      };
    case CHECK_CODE_FAIL:
      return {
        ...state,
        checking: false,
        isChecked: false,
      };
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        sending: true,
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        sending: false,
        isSend: false,
        checking: false,
        isChecked: false,
        isChanged: true,
        email: '',
      }
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        sending: false,
        isChanged: false,
      }
    default:
      return state;
  }
}
