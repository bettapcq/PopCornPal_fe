import "./styles/bootstrap-custom.scss";
import "./styles/global.scss";
import LandingPage from "./pages/landingPage/LandingPage";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import PrivatePages from "./pages/PrivatePages";

function App() {
  return (
    <>
      <Container className="main-container" fluid>
        <Routes>
          {/* PUBLIC ROUTE */}
          <Route path="/" element={<LandingPage />} />
          {/* PRIVATE ROUTE */}
          <Route path="/private/*" element={<PrivatePages />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
