import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../reducers/AuthReducer";
import UserReducer from "../reducers/UserReducer";
import EventReducer from "../reducers/EventReducer";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    users: UserReducer,
    events: EventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false }),
});
export default store;
