export const PROFILE_LOADING = "PROFILE_LOADING";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_ERROR = "PROFILE_ERROR";
export const CLEAR_USER_ALERTS = "CLEAR_USER_ALERTS";

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

//upload profile image

export const uploadProfileImage = (formData) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:7001/users/me/avatar", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      dispatch({ type: PROFILE_LOADING });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error uploading image");
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
