import {
  EVENTS_LOADING,
  EVENTS_ERROR,
  GET_HOME_EVENTS_SUCCESS,
  GET_USERS_PAST_EVENTS_SUCCESS,
  GET_USERS_FUTURE_EVENTS_SUCCESS,
  GET_USERS_JOINED_EVENTS_SUCCESS,
  GET_SINGLE_EVENT_SUCCESS,
  DELETE_EVENT_SUCCESS,
  CREATE_EVENT_SUCCESS,
  CLEAR_EVENTS_ALERTS,
  EDIT_EVENT_SUCCESS,
  GET_USERS_EVENTS_TO_JOIN_SUCCESS,
  GET_NEAR_EVENTS_SUCCESS,
} from "../actions/EventActions";

const initialState = {
  homeEvents: {
    nearEvents: [],
    filteredEvents: [],
  },
  selectedEvent: null,
  userEvents: {
    pastEvents: { content: [] }, // in responses Page<event> i need content
    futureEvents: { content: [] },
    joinedEvents: { content: [] },
    toJoinEvents: { content: [] },
  },

  loading: false,
  message: null,
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
        homeEvents: {
          ...state.homeEvents,
          filteredEvents: action.payload,
        },
        loading: false,
      };

    case GET_NEAR_EVENTS_SUCCESS:
      return {
        ...state,
        homeEvents: {
          ...state.homeEvents,
          nearEvents: action.payload,
        },
        loading: false,
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

    case GET_USERS_EVENTS_TO_JOIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userEvents: {
          ...state.userEvents,
          toJoinEvents: action.payload,
        },
      };

    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        message: "Event successfully deleted",
        selectedEvent: null,
        homeEvents: {
          ...state.homeEvents,
          filteredEvents: state.homeEvents.filteredEvents.filter(
            (event) => event.eventId !== action.payload,
          ),
        },
        userEvents: {
          ...state.userEvents,
          futureEvents: {
            ...state.userEvents.futureEvents,
            content: state.userEvents.futureEvents?.content?.filter(
              (event) => event.eventId !== action.payload,
            ),
          },
        },
      };

    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        payload: action.payload,
        selectedEvent: action.payload,
      };

    case CLEAR_EVENTS_ALERTS:
      return {
        ...state,
        message: null,
        error: null,
      };

    case EDIT_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        selectedEvent: action.payload,
      };

    default:
      return state;
  }
}

export default EventReducer;
