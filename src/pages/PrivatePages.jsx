import { Routes, Route } from "react-router-dom";
import SuperiorNavBar from "../components/superiorNavBAr/SuperiorNavBar";
import HomePage from "./HomePage/HomePage";
import ProfilePage from "./profilePage/ProfilePage";
import EventPage from "./EventPage/EventPage";
import EventFormPage from "./EventFormPage/eventFormPage";
import SecuritySettingsPage from "./securitySettingsPage/SecuritySettingsPage";
import NotificationsPage from "./notificationsPage/NotificationsPage";

function PrivatePages() {
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
