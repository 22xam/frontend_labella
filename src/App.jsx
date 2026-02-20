import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginScreen } from "./components/auth/LoginScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<LoginScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
