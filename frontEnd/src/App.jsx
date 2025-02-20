import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "sonner";
import Pushup from "./pages/Pushup";
import Pullup from "./pages/Pullup";
import JumpingJack from "./pages/JumpingJack";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Home />}></Route>
        <Route path="/signup" element={<Home />}></Route>
        <Route path="/pushup" element={<Pushup />}></Route>
        <Route path="/pullups" element={<Pullup />}></Route>
        <Route path="/jumpingJack" element={<JumpingJack />}></Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
