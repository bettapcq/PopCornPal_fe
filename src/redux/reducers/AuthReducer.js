import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from "../actions/AuthActions";

const initialState = {
  user: null,
  token: null,
  isLogged: false,
  error: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
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

    default:
      return state;
  }
}

export default userReducer;
