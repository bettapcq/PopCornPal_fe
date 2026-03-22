import {
  PROFILE_LOADING,
  PROFILE_SUCCESS,
  PROFILE_ERROR,
  CLEAR_USER_ALERTS,
} from "../actions/UserActions";

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

function UserReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        profile: action.payload,
      };

    case CLEAR_USER_ALERTS:
      return {
        ...state,
        message: null,
        error: null,
      };

    case "UPDATE_LOGGED_USER":
      return {
        ...state,
        userLogged: {
          ...state.userLogged,
          ...action.payload,
        },
      };

    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default UserReducer;
