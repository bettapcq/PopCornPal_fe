import { Routes, Route } from "react-router-dom";
import ProfilePage from "./profilePage/ProfilePage";
import SuperiorNavBar from "../components/superiorNavBAr/SuperiorNavBar";

function PrivatePages() {
  return (
    <>
      <SuperiorNavBar />
      <Routes>
        <Route path="profile/:userId" element={<ProfilePage />} />
        {/* <Route path="/home" element={<EventsPage />} /> */}
        {/* <Route path="/event" element={<EventsPage />} /> */}
        {/* <Route path="/settings" element={<SettingsPage />} /> */}
        {/* <Route path="/messages" element={<MessagesPage />} /> */}
      </Routes>
    </>
  );
}

export default PrivatePages;
