import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/home/Home";
import Masters from "./pages/masters/Masters";
import Services from "./pages/services/Services";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="services" element={<Services />}></Route>
          <Route path="masters" element={<Masters />}></Route>

          <Route path="auth">
            <Route path="login" element></Route>
            <Route path="register" element></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
