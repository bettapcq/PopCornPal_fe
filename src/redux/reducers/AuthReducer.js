import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_CLOSE,
  LOGOUT,
} from "../actions/AuthActions";

const initialState = {
  token: null,
  isLogged: false,
  error: null,
  message: null,
  loading: false,
  user: null,
};

function AuthReducer(state = initialState, action) {
  switch (action.type) {
    //-----LOGIN CASES

    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isLogged: true,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case LOGOUT:
      return initialState;

    //-----REGISTER CASES

    case REGISTER_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
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

export default AuthReducer;
