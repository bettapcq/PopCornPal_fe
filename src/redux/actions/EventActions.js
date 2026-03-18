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
export const GET_USERS_EVENTS_TO_JOIN_SUCCESS =
  "GET_USERS_EVENTS_TO_JOIN_SUCCESS";
export const GET_NEAR_EVENTS_SUCCESS = "GET_NEAR_EVENTS_SUCCESS";

const eventsUrl = "http://localhost:7001/events";

// --------- HOME FILTERED FETCH

export const getFilteredEvents = (filters = {}) => {
  //fetch with filter object (can add all filter combinations, using just one fetch)

  return async (dispatch) => {
    dispatch({ type: EVENTS_LOADING });
    console.log("GET FILTERED EVENTS ACTION TRIGGERED");
    const token = localStorage.getItem("token");

    try {
      const query = new URLSearchParams(filters).toString();
      const url = query ? `${eventsUrl}?${query}` : eventsUrl;

      const response = await fetch(`${url}`, {
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
        payload: data.content,
      });
    } catch (error) {
      dispatch({
        type: EVENTS_ERROR,
        payload: error.message,
      });
    }
  };
};

// -- GET EVENTS NEAR ME WITH GEOLOCATION

export const getEventsNearMe = () => {
  return async (dispatch) => {
    dispatch({ type: EVENTS_LOADING });
    const token = localStorage.getItem("token");

    // no browser geolocation
    if (!navigator.geolocation) {
      dispatch(getFilteredEvents({ timeFilter: "future" }));
      return;
    }

    // user accept geolocation
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const token = localStorage.getItem("token");

        try {
          const response = await fetch(
            `${eventsUrl}?lat=${lat}&lng=${lng}&radius=50&timeFilter=future`,
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
            type: GET_NEAR_EVENTS_SUCCESS,
            payload: data.content,
          });
        } catch (error) {
          dispatch({
            type: EVENTS_ERROR,
            payload: error.message,
          });
        }
      },

      // user reject geolocation callback
      () => {
        dispatch(getFilteredEvents({ timeFilter: "future" }));
      },
    );
  };
};

//-------GET SINGLE EVENT

export const getSingleEvent = (eventId) => {
  return async (dispatch) => {
    dispatch({ type: EVENTS_LOADING });
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${eventsUrl}/${eventId}`, {
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

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${eventsUrl}?creatorId=${userId}&size=200&sort=dateTime,asc`,
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

// ---------- USERS PAST JOINED EVENTS FETCH

export const getUserJoinedEvents = (userId) => {
  return async (dispatch) => {
    dispatch({ type: EVENTS_LOADING });

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${eventsUrl}/joined/${userId}?page=0&size=200`,
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

// -------GET USERS FUTURE EVENTS TO JOIN

export const getUserFutureEventsToJoin = (userId) => {
  return async (dispatch) => {
    dispatch({ type: EVENTS_LOADING });

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${eventsUrl}/to-join/${userId}?page=0&size=200`,
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
        type: GET_USERS_EVENTS_TO_JOIN_SUCCESS,
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
      const response = await fetch(`${eventsUrl}`, {
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
      const response = await fetch(`${eventsUrl}/${eventId}`, {
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
      const response = await fetch(`${eventsUrl}/${eventId}`, {
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
