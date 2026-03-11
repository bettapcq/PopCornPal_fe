export const GET_EVENTS_ERROR = "GET_EVENTS_ERROR";
export const GET_EVENTS_LOADING = "GET_EVENTS_LOADING";
export const GET_HOME_EVENTS_SUCCESS = "GET_HOME_EVENTS_SUCCESS";
export const GET_USERS_PAST_EVENTS_SUCCESS = "GET_USER_PAST_EVENTS_SUCCESS";
export const GET_USERS_FUTURE_EVENTS_SUCCESS =
  "GET_USERS_FUTURE_EVENTS_SUCCESS";
export const GET_USERS_JOINED_EVENTS_SUCCESS =
  " GET_USERS_JOINED_EVENTS_SUCCESS";

// --------- HOME EVENTS FETCH

export const getHomeEvents = (filters = {}) => {
  //fetch with filter object (can add all filter combinations, using just one fetch)

  return async (dispatch) => {
    dispatch({ type: GET_EVENTS_LOADING });

    try {
      const eventsUrl = "http://localhost:7001/events";
      const token = localStorage.getItem("token");

      const query = new URLSearchParams(filters).toString();

      const response = await fetch(`${eventsUrl}?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Error fetching events");
      }

      dispatch({
        type: GET_HOME_EVENTS_SUCCESS,
        payload: data.content,
      });
    } catch (error) {
      dispatch({
        type: GET_EVENTS_ERROR,
        payload: error.message,
      });
    }
  };
};

// ---------- USERS PAST EVENTS FETCH

export const getUserPastEvents = (userId, page = 0) => {
  return async (dispatch) => {
    dispatch({ type: GET_EVENTS_LOADING });

    const eventsUrl = "http://localhost:7001/events";
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${eventsUrl}?creatorId=${userId}&timeFilter=past&&size=200`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      dispatch({
        type: GET_USERS_PAST_EVENTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_EVENTS_ERROR,
        payload: error.message,
      });
    }
  };
};

// ---------- USERS FUTURE EVENTS FETCH

export const getUserFutureEvents = (userId) => {
  return async (dispatch) => {
    dispatch({ type: GET_EVENTS_LOADING });

    const eventsUrl = "http://localhost:7001/events";
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${eventsUrl}?creatorId=${userId}&page&size=200`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      dispatch({
        type: GET_USERS_FUTURE_EVENTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_EVENTS_ERROR,
        payload: error.message,
      });
    }
  };
};

// ---------- USERS JOINED EVENTS FETCH

export const getUserJoinedEvents = (userId) => {
  return async (dispatch) => {
    dispatch({ type: GET_EVENTS_LOADING });

    const eventsUrl = "http://localhost:7001/events/joined";
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${eventsUrl}?creatorId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      dispatch({
        type: GET_USERS_JOINED_EVENTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_EVENTS_ERROR,
        payload: error.message,
      });
    }
  };
};
