import React from "react";
import { Survey } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Survey />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
