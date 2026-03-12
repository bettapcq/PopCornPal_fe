import { faL } from "@fortawesome/free-solid-svg-icons";
import {
  EVENTS_LOADING,
  EVENTS_ERROR,
  GET_HOME_EVENTS_SUCCESS,
  GET_USERS_PAST_EVENTS_SUCCESS,
  GET_USERS_FUTURE_EVENTS_SUCCESS,
  GET_USERS_JOINED_EVENTS_SUCCESS,
  JOIN_EVENT_SUCCESS,
  GET_SINGLE_EVENT_SUCCESS,
} from "../actions/EventActions";

const initialState = {
  homeEvents: [],
  selectedEvent: null,
  participationStatus: {},
  userEvents: {
    pastEvents: { content: [] },
    futureEvents: { content: [] },
    joinedEvents: { content: [] },
  },

  loading: false,
  error: null,
};

function EventReducer(state = initialState, action) {
  switch (action.type) {
    case EVENTS_LOADING:
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

    case EVENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_SINGLE_EVENT_SUCCESS:
      return {
        ...state,
        selectedEvent: action.payload,
        loading: false,
      };

    case JOIN_EVENT_SUCCESS:
      return {
        ...state,
        participationStatus: {
          ...state.participationStatus,
          [action.payload.eventId]: action.payload.participationStatus,
        },
      };

    default:
      return state;
  }
}

export default EventReducer;
