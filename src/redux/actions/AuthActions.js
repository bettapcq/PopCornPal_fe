export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";
export const RESET_PASSWORD_CLOSE = "RESET_PASSWORD_CLOSE";
export const CLEAR_AUTH_ERROR = "CLEAR_AUTH_ERROR";
export const LOGOUT = "LOGOUT";
import { getProfile } from "./UserActions";

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

      console.log("LOGIN RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed"); // Use error message from server if available
      }

      //save token in localstorage:

      localStorage.setItem("token", data.token);
      const userId = data.userLogged.userId;

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: data.token,
          userLogged: data.userLogged,
        },
      });

      //after login success get my profile:
      dispatch(getProfile(userId));
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
        throw new Error(data.errorsList || "Registration failed"); // User error message from server if available
      }

      localStorage.setItem("token", data.token);
      const userId = data.userLogged.userId;
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          token: data.token,
          userLogged: data.userLogged,
        },
      });

      dispatch(getProfile(userId));
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

//to refresh page
export const getMe = () => async (dispatch, getState) => {
  const token = getState().auth.token;

  const response = await fetch("http://localhost:7001/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      token,
      userLogged: data,
    },
  });
};
