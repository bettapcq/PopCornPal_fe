import { Routes, Route } from "react-router-dom";

import SuperiorNavBar from "../components/superiorNavBAr/SuperiorNavBar";
import HomePage from "./HomePage/HomePage";

function PrivatePages() {
  return (
    <>
      <SuperiorNavBar />
      <Routes>
        {/* <Route path="/profile/:userId" element={<ProfilePage />} /> */}
        <Route path="/home" element={<HomePage />} />
        {/* <Route path="/event" element={<EventsPage />} /> */}
        {/* <Route path="/settings" element={<SettingsPage />} /> */}
        {/* <Route path="/messages" element={<MessagesPage />} /> */}
      </Routes>
    </>
  );
}

export default PrivatePages;
