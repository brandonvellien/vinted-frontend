import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// import de mes pages

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import SignUp from "./pages/SignUp";

// Composant
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offers/:id" element={<Offer />} />{" "}
        <Route path="/signup" element={<SignUp />} />{" "}
        <Route path="*" element={<p>Error 404</p>} />
      </Routes>
    </Router>
  );
}

export default App;
