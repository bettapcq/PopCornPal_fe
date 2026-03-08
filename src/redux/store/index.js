import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../reducers/AuthReducer";
import UserReducer from "../reducers/UserReducer";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    users: UserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false }),
});
export default store;
