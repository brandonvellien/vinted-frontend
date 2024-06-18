import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Cookies from "js-cookie";
import { useState } from "react";

// import de mes pages

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

// Composant
import Header from "./components/Header";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [search, setSearch] = useState("");
  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };
  return (
    <Router>
      <Header
        token={token}
        handleToken={handleToken}
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/offers/:id" element={<Offer />} />{" "}
        <Route path="/signup" element={<SignUp handleToken={handleToken} />} />{" "}
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="*" element={<p>Error 404</p>} />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/payment" element={<Payment token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
