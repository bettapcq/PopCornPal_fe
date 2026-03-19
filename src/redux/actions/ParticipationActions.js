import { API_URL } from "../../api/api";
import { getSingleEvent } from "./EventActions";

export const PARTICIPATIONS_LOADING = "PARTICIPATIONS_LOADING";
export const PARTICIPATIONS_ERROR = "PARTICIPATIONS_ERROR";
export const JOIN_EVENT_SUCCESS = "JOIN_EVENT_SUCCESS";
export const GET_EVENT_REQUESTS_SUCCESS = "GET_EVENT_REQUESTS_SUCCESS";
export const MANAGE_JOIN_REQUEST_SUCCESS = "MANAGE_JOIN_REQUEST_SUCCESS";
export const LEAVE_EVENT_SUCCESS = "LEAVE_EVENT_SUCCESS";
export const RATE_PARTICIPATION_SUCCESS = "RATE_PARTICIPATION_SUCCESS";

// ------JOIN EVENT
export const joinEvent = (eventId) => {
  return async (dispatch) => {
    dispatch({ type: PARTICIPATIONS_LOADING });
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/events/${eventId}/join`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error joining event");
      }

      dispatch({
        type: JOIN_EVENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PARTICIPATIONS_ERROR,
        payload: error.message,
      });
    }
  };
};

// GET PENDING JOIN REQUESTS

export const getParticipationRequests = (eventId) => {
  return async (dispatch) => {
    dispatch({ type: PARTICIPATIONS_LOADING });
    try {
      const response = await fetch(`${API_URL}/events/${eventId}/requests`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error fetching requests");
      }

      dispatch({
        type: GET_EVENT_REQUESTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PARTICIPATIONS_ERROR,
        payload: error.message,
      });
    }
  };
};

// ----MANAGE JOIN REQUESTS
export const manageParticipationsRequests = (
  participationId,
  status,
  eventId,
) => {
  return async (dispatch) => {
    dispatch({ type: PARTICIPATIONS_LOADING });
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${API_URL}/participations/${participationId}?status=${status}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error managing request");
      }

      dispatch({
        type: MANAGE_JOIN_REQUEST_SUCCESS,
        payload: data,
      });

      dispatch(getSingleEvent(eventId));
      dispatch(getParticipationRequests(eventId));

      return data;
    } catch (error) {
      dispatch({
        type: PARTICIPATIONS_ERROR,
        payload: error.message,
      });
    }
  };
};

//leave event

export const leaveEvent = (participationId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${API_URL}/participations/${participationId}/leave`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (!response.ok) throw new Error("Failed to leave event");

      dispatch({ type: LEAVE_EVENT_SUCCESS });
      dispatch(getSingleEvent(eventId));
    } catch (error) {
      dispatch({ type: PARTICIPATIONS_ERROR, payload: error.message });
    }
  };
};

// rate paricipation
export const rateParticipation = (participationId, rating) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${API_URL}/participations/${participationId}/rate`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating }),
        },
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to rate participation");

      dispatch({
        type: RATE_PARTICIPATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: PARTICIPATIONS_ERROR, payload: error.message });
    }
  };
};
