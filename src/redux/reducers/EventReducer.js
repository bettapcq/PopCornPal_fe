import {
  GET_EVENTS_LOADING,
  GET_EVENTS_ERROR,
  GET_HOME_EVENTS_SUCCESS,
  GET_USERS_PAST_EVENTS_SUCCESS,
  GET_USERS_FUTURE_EVENTS_SUCCESS,
  GET_USERS_JOINED_EVENTS_SUCCESS,
} from "../actions/EventActions";

const initialState = {
  homeEvents: [],
  userEvents: {
    pastEvents: [],
    futureEvents: [],
    joinedEvents: [],
  },
  loading: false,
  error: null,
};

function EventReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_HOME_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        homeEvents: action.payload,
      };

    case GET_USERS_PAST_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        userEvents: {
          ...state.userEvents,
          pastEvents: action.payload,
        },
      };

    case GET_USERS_FUTURE_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        userEvents: {
          ...state.userEvents,
          futureEvents: action.payload,
        },
      };

    case GET_USERS_JOINED_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        userEvents: {
          ...state.userEvents,
          joinedEvents: action.payload,
        },
      };

    case GET_EVENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default EventReducer;
