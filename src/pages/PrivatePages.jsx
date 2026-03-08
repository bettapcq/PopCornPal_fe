import { Routes, Route } from "react-router-dom";
import SuperiorNavBar from "../components/superiorNavBAr/SuperiorNavBar";
import HomePage from "./HomePage/HomePage";
import { Container } from "react-bootstrap";

function PrivatePages() {
  return (
    <Container fluid className="static-background">
      <SuperiorNavBar />
      <Routes>
        {/* <Route path="/profile/:userId" element={<ProfilePage />} /> */}
        <Route path="/home" element={<HomePage />} />
        {/* <Route path="/event" element={<EventsPage />} /> */}
        {/* <Route path="/settings" element={<SettingsPage />} /> */}
        {/* <Route path="/messages" element={<MessagesPage />} /> */}
      </Routes>
    </Container>
  );
}

export default PrivatePages;
