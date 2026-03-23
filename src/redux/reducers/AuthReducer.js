import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_CLOSE,
  LOGOUT,
  CLEAR_AUTH_ERROR,
  EDIT_SECURITY_SUCCESS,
  SECURITY_ERROR,
} from "../actions/AuthActions";

const initialState = {
  token: localStorage.getItem("token"),
  userLogged: null,
  isLogged: !!localStorage.getItem("token"),
  error: null,
  message: null,
  loading: false,
};

function AuthReducer(state = initialState, action) {
  switch (action.type) {
    //-----LOGIN CASES

    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userLogged: action.payload.userLogged,
        isLogged: true,
        error: null,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem("token");

      return {
        ...state,
        token: null,
        userLogged: null,
        isLogged: false,
      };

    //-----REGISTER CASES

    case REGISTER_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userLogged: action.payload.userLogged,
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

    case EDIT_SECURITY_SUCCESS:
      return {
        ...state,
        userLogged: action.payload.user,
        message: action.payload.message,
        error: null,
      };
    case SECURITY_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: null,
        message: null,
      };

    default:
      return state;
  }
}

export default AuthReducer;
