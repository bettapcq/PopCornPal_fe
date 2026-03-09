export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";
export const RESET_PASSWORD_CLOSE = "RESET_PASSWORD_CLOSE";
export const LOGOUT = "LOGOUT";
import { getMyProfile } from "./UserActions";

// ------LOGIN
export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:7001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed"); // Use error message from server if available
      }

      //save token in localstorage:

      localStorage.setItem("token", data.token);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.token,
      });

      //after login success get my profile:
      dispatch(getMyProfile());
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.message,
      });
    }
  };
};

// -----LOGOUT

export const logout = () => {
  return (dispatch) => {
    // rimuove il token salvato
    localStorage.removeItem("token");

    dispatch({
      type: LOGOUT,
    });
  };
};

//-----REGISTER
export const register = (userData) => {
  console.log("REGISTER PAYLOAD:", userData);

  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:7001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errorsList || "Registration failed"); // Use error message from server if available
      }
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });

      dispatch(getMyProfile());
    } catch (error) {
      dispatch({
        type: REGISTER_ERROR,
        payload: error.message,
      });
    }
  };
};

//-----RESET PASSWORD

export const resetPassword = (email) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:7001/auth/reset-password?email=${email}`,
        { method: "POST" },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Reset password failed");
      }
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_ERROR,
        payload: error.message,
      });
    }
  };
};
