import "./styles/bootstrap-custom.scss";
import "./styles/global.scss";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import LandingPage from "./pages/landingPage/LandingPage";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import PrivatePages from "./pages/privatePages";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Container className="main-container" fluid>
            <Routes>
              {/* PUBLIC ROUTE */}
              <Route path="/" element={<LandingPage />} />
              {/* PRIVATE ROUTE */}
              <Route path="/private/*" element={<PrivatePages />} />
            </Routes>
          </Container>
          <Footer />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
