import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Home />}></Route>
        <Route path="/signup" element={<Home />}></Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
