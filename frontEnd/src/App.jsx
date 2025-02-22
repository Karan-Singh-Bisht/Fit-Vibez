import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "sonner";
import Pushup from "./pages/Pushup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "./config/config";
import Squat from "./pages/Squat";
import Curl from "./pages/Curl";
const client = new QueryClient();
const App = () => {
  return (
    <>
      <QueryClientProvider client={client}>
        <WagmiProvider config={config}>
          <RainbowKitProvider theme={darkTheme()}>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Home />}></Route>
              <Route path="/signup" element={<Home />}></Route>
              <Route path="/pushup" element={<Pushup />}></Route>
              <Route path="/curl" element={<Curl />}></Route>
              <Route path="/squat" element={<Squat />}></Route>
              <Route path="/donate" element={<Home />}></Route>
            </Routes>
            <Toaster />
          </RainbowKitProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
