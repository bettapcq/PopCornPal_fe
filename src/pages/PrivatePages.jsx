import { Routes, Route } from "react-router-dom";
import SuperiorNavBar from "../components/superiorNavBAr/SuperiorNavBar";
import HomePage from "./HomePage/HomePage";
import ProfilePage from "./profilePage/ProfilePage";
import EventPage from "./EventPage/EventPage";
import EventFormPage from "./EventFormPage/EventFormPage";
import SecuritySettingsPage from "./securitySettingsPage/SecuritySettingsPage";
import NotificationsPage from "./notificationsPage/NotificationsPage";
import { getMe } from "../redux/actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function PrivatePages() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  //persist userLogged in app after refresh
  useEffect(() => {
    if (token) {
      dispatch(getMe());
    }
  }, [token]);
  return (
    <>
      <SuperiorNavBar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile/:userId?" element={<ProfilePage />} />
        <Route path="/event/:eventId?" element={<EventPage />} />
        <Route path="/event/form/:eventId?" element={<EventFormPage />} />
        <Route path="/security" element={<SecuritySettingsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        {/* <Route path="/messages" element={<MessagesPage />} /> */}
      </Routes>
    </>
  );
}

export default PrivatePages;
