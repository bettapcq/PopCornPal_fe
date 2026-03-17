import {
  GET_EVENT_REQUESTS_SUCCESS,
  JOIN_EVENT_SUCCESS,
  MANAGE_JOIN_REQUEST_SUCCESS,
  PARTICIPATIONS_ERROR,
  PARTICIPATIONS_LOADING,
  LEAVE_EVENT_SUCCESS,
} from "../actions/ParticipationActions";

const initialState = {
  myParticipations: {},
  requests: [],
  error: null,
  loading: null,
  message: null,
};

function ParticipationReducer(state = initialState, action) {
  switch (action.type) {
    case PARTICIPATIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PARTICIPATIONS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case JOIN_EVENT_SUCCESS:
      return {
        ...state,
        myParticipations: {
          ...state.myParticipations,
          [action.payload.eventId]: action.payload.participationStatus,
        },
      };
    case LEAVE_EVENT_SUCCESS:
      return {
        ...state,
        message: "You left the event",
        loading: false,
        error: null,
      };
    case GET_EVENT_REQUESTS_SUCCESS:
      return {
        ...state,
        requests: action.payload,
        error: null,
        loading: null,
        message: null,
      };

    case MANAGE_JOIN_REQUEST_SUCCESS:
      return {
        ...state,
        requests: state.requests.filter(
          (req) => req.participationId !== action.payload.participationId,
        ),
      };

    default:
      return state;
  }
}

export default ParticipationReducer;
