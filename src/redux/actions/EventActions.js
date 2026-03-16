export const EVENTS_ERROR = "GET_EVENTS_ERROR";
export const EVENTS_LOADING = "GET_EVENTS_LOADING";
export const GET_HOME_EVENTS_SUCCESS = "GET_HOME_EVENTS_SUCCESS";
export const GET_USERS_PAST_EVENTS_SUCCESS = "GET_USER_PAST_EVENTS_SUCCESS";
export const GET_USERS_FUTURE_EVENTS_SUCCESS =
  "GET_USERS_FUTURE_EVENTS_SUCCESS";
export const GET_USERS_JOINED_EVENTS_SUCCESS =
  "GET_USERS_JOINED_EVENTS_SUCCESS";
export const GET_SINGLE_EVENT_SUCCESS = "GET_SINGLE_EVENT_SUCCESS";
export const DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS";
export const CLEAR_EVENTS_ALERTS = "CLEAR_EVENTS_ALERTS";
export const CREATE_EVENT_SUCCESS = "CREATE_EVENT_SUCCESS";
export const EDIT_EVENT_SUCCESS = "EDIT_EVENT_SUCCESS";

// --------- HOME EVENTS FETCH

export const getFilteredEvents = (filters = {}) => {
  //fetch with filter object (can add all filter combinations, using just one fetch)

  return async (dispatch) => {
    dispatch({ type: EVENTS_LOADING });

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
        throw new Error(data.message || "Error fetching events");
      }

      dispatch({
        type: GET_HOME_EVENTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EVENTS_ERROR,
        payload: error.message,
      });
    }
  };
};

//-------GET SINGLE EVENT

export const getSingleEvent = (eventId) => {
  return async (dispatch) => {
    dispatch({ type: EVENTS_LOADING });

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:7001/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error fetching events");
      }

      dispatch({
        type: GET_SINGLE_EVENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EVENTS_ERROR,
        payload: error.message,
      });
    }
  };
};

// ---------- USERS PAST EVENTS FETCH

export const getUserPastEvents = (userId) => {
  return async (dispatch) => {
    dispatch({ type: EVENTS_LOADING });

    const eventsUrl = "http://localhost:7001/events";
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${eventsUrl}?creatorId=${userId}&timeFilter=past&size=200`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error fetching events");
      }
      dispatch({
        type: GET_USERS_PAST_EVENTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EVENTS_ERROR,
        payload: error.message,
      });
    }
  };
};

// ---------- USERS FUTURE EVENTS FETCH

export const getUserFutureEvents = (userId) => {
  return async (dispatch) => {
    dispatch({ type: EVENTS_LOADING });

    const eventsUrl = "http://localhost:7001/events";
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${eventsUrl}?creatorId=${userId}&size=200`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error fetching events");
      }

      dispatch({
        type: GET_USERS_FUTURE_EVENTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EVENTS_ERROR,
        payload: error.message,
      });
    }
  };
};

// ---------- USERS JOINED EVENTS FETCH

export const getUserJoinedEvents = (userId) => {
  return async (dispatch) => {
    dispatch({ type: EVENTS_LOADING });

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:7001/events/joined/${userId}?page=0&size=200`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error fetching events");
      }

      dispatch({
        type: GET_USERS_JOINED_EVENTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EVENTS_ERROR,
        payload: error.message,
      });
    }
  };
};

// CREATE EVENT

export const createEvent = (eventData) => {
  return async (dispatch) => {
    dispatch({ type: EVENTS_LOADING });

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:7001/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error creating event");
      }

      dispatch({
        type: CREATE_EVENT_SUCCESS,
        payload: data,
        loading: null,
        error: null,
      });
      return data;
    } catch (error) {
      dispatch({
        type: EVENTS_ERROR,
        payload: error.message,
      });
    }
  };
};

//EDIT EVENT

export const editEvent = (eventId, eventData) => {
  return async (dispatch) => {
    dispatch({ type: EVENTS_LOADING });

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:7001/events/${eventId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error editing event");
      }

      dispatch({
        type: EDIT_EVENT_SUCCESS,
        payload: data,
      });
      return data;
    } catch (error) {
      dispatch({
        type: EVENTS_ERROR,
        payload: error.message,
      });
    }
  };
};

//-- DELETE EVENT

export const deleteEvent = (eventId) => {
  return async (dispatch) => {
    dispatch({ type: EVENTS_LOADING });
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:7001/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error deleting event");
      }

      dispatch({
        type: DELETE_EVENT_SUCCESS,
        payload: eventId,
      });
    } catch (error) {
      dispatch({
        type: EVENTS_ERROR,
        payload: error.message,
      });
    }
  };
};
