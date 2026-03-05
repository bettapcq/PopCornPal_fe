import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import LandingPage from "./components/LandingPage";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Container className="main-container" fluid>
            <Routes>
              <Route path="/" element={<LandingPage />} />
            </Routes>
            {/* <Routes>
          <SuperiorNavBar />
          <Route path="/home" element={<div>Home</div>} />
        </Routes> */}
          </Container>
          <Footer />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
