export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

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
        throw new Error(data.message || "Login failed");
      }

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.message,
      });
    }
  };
};
