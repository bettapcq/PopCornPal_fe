import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_CLOSE,
} from "../actions/AuthActions";

const initialState = {
  user: null,
  token: null,
  isLogged: false,
  error: null,
  message: null,
  loading: false,
  success: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    //-----LOGIN CASES

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLogged: true,
        error: null,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    //-----REGISTER CASES

    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isLogged: true,
        error: null,
      };

    case REGISTER_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    //-----RESET PASSWORD CASES

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        error: null,
        message: action.payload,
      };

    case RESET_PASSWORD_CLOSE:
      return {
        ...state,
        error: null,
        message: null,
      };

    case RESET_PASSWORD_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export default userReducer;
