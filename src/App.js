import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/notifications" element={<Notifications />} /> */}
      </Routes>
    </div>
  );
}

export default App;
