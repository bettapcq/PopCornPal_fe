import {
  PROFILE_LOADING,
  PROFILE_SUCCESS,
  PROFILE_ERROR,
} from "../reducers/UserReducer";

export const getProfile = (userId) => {
  return async (dispatch) => {
    dispatch({ type: PROFILE_LOADING });

    const profileUrl = userId
      ? `http://localhost:7001/users/${userId}`
      : `http://localhost:7001/users/me`;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(profileUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Getting personal profile failed");
      }

      dispatch({
        type: PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: error.message,
      });
    }
  };
};

export const editProfileDetails = (updatedData) => {
  return async (dispatch) => {
    dispatch({ type: PROFILE_LOADING });

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:7001/users/me/details", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errorsList || "Updating profile failed");
      }

      dispatch({
        type: PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: error.message,
      });
    }
  };
};
