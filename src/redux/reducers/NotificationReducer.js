import {
  NOTIFICATIONS_ERROR,
  NOTIFICATIONS_LOADING,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFIFATIONS_UNREAD_COUNT_SUCCESS,
} from "../actions/NotificationActions";

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
  message: null,
};

function NotificationReducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATIONS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
        loading: false,
        error: null,
      };
    case NOTIFICATIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_NOTIFIFATIONS_UNREAD_COUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        unreadCount: action.payload,
      };

    default:
      return state;
  }
}

export default NotificationReducer;
