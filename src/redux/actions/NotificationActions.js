export const NOTIFICATIONS_LOADING = "NOTIFICATIONS_LOADING";
export const GET_NOTIFICATIONS_SUCCESS = "GET_NOTIFICATIONS_SUCCESS";
export const NOTIFICATIONS_ERROR = "NOTIFICATIONS_ERROR";
export const GET_NOTIFIFATIONS_UNREAD_COUNT_SUCCESS =
  "GET_NOTIFIFATIONS_UNREAD_COUNT_SUCCESS";
export const NOTIFIFATION_MARKED_AS_READ_SUCCESS =
  "NOTIFIFATION_MARKED_AS_READ_SUCCESS";

export const getNotifications = () => {
  return async (dispatch) => {
    dispatch({ type: NOTIFICATIONS_LOADING });

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:7001/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error fetching notifications");
      }

      dispatch({
        type: GET_NOTIFICATIONS_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      dispatch({ type: NOTIFICATIONS_ERROR, payload: error.message });
    }
  };
};

export const getnotificationUnreadCount = () => {
  return async (dispatch) => {
    dispatch({ type: NOTIFICATIONS_LOADING });

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:7001/notifications/unread`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error fetching notifications count");
      }

      dispatch({
        type: GET_NOTIFIFATIONS_UNREAD_COUNT_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      dispatch({
        type: NOTIFICATIONS_ERROR,
        payload: error.message,
      });
    }
  };
};

export const markNotificationAsRead = (notificationId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:7001/notifications/${notificationId}/read`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(getNotifications());
    dispatch(getnotificationUnreadCount());
  };
};
