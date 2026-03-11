import "./styles/bootstrap-custom.scss";
import "./styles/global.scss";
import LandingPage from "./pages/landingPage/LandingPage";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import PrivatePages from "./pages/privatePages";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./redux/actions/AuthActions";

function App() {
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
