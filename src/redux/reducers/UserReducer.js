export const PROFILE_LOADING = "PROFILE_LOADING";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_ERROR = "PROFILE_ERROR";

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
        profile: action.payload,
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
