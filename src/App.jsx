import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/SignUp";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
  );
}

export default App;
