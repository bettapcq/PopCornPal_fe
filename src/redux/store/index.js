import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../reducers/AuthReducer";
import UserReducer from "../reducers/UserReducer";
import EventReducer from "../reducers/EventReducer";
import NotificationReducer from "../reducers/NotificationReducer";
import ParticipationReducer from "../reducers/ParticipationReducer";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    users: UserReducer,
    events: EventReducer,
    notifications: NotificationReducer,
    participations: ParticipationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false }),
});
export default store;
