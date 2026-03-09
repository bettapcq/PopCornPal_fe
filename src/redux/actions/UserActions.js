import { GET_USER_REQUEST } from "../reducers/UserReducer";
import { GET_USER_SUCCESS } from "../reducers/UserReducer";
import { GET_USER_ERROR } from "../reducers/UserReducer";

export const getMyProfile = () => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:7001/users/me", {
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
        type: GET_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_USER_ERROR,
        payload: error.message,
      });
    }
  };
};
