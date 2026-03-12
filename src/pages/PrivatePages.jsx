import { Routes, Route } from "react-router-dom";
import SuperiorNavBar from "../components/superiorNavBAr/SuperiorNavBar";
import HomePage from "./HomePage/HomePage";
import ProfilePage from "./profilePage/ProfilePage";
import EventPage from "./EventPage/EventPage";

function PrivatePages() {
  return (
    <>
      <SuperiorNavBar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile/:userId?" element={<ProfilePage />} />
        <Route path="/event/:eventId?" element={<EventPage />} />
        {/* <Route path="/settings" element={<SettingsPage />} /> */}
        {/* <Route path="/messages" element={<MessagesPage />} /> */}
      </Routes>
    </>
  );
}

export default PrivatePages;
