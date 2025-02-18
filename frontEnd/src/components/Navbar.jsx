import React, { useState } from "react";
import { FaPaperPlane, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import WalletBtn from "./ConnectWallet";
const client = new QueryClient();
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navbarOptions = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <QueryClientProvider client={client}>
      <WagmiProvider config={config}>
        <RainbowKitProvider theme={darkTheme()}>
          <div className="w-full bg-[#0D0E0F] py-3 px-[8vw]">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center gap-4">
                <span className="text-white text-2xl">
                  <FaPaperPlane />
                </span>
                <h1 className="text-white text-xl font-bold">Fit Vibez</h1>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex gap-6 items-center">
                <ul className="text-[#949391] text-sm flex gap-6">
                  {navbarOptions.map((option, index) => (
                    <li
                      key={index}
                      className="hover:cursor-pointer hover:text-white transition"
                    >
                      <Link to={option?.href}>{option.label}</Link>
                    </li>
                  ))}
                </ul>
                <WalletBtn />
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white text-2xl"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
              <div className="md:hidden flex flex-col mt-4 bg-[#111] p-4 rounded-lg">
                {navbarOptions.map((option, index) => (
                  <Link
                    key={index}
                    to={option.href}
                    className="text-[#949391] py-2 text-center hover:text-white transition"
                    onClick={() => setIsOpen(false)} // Close menu on click
                  >
                    {option.label}
                  </Link>
                ))}
                <WalletBtn />
              </div>
            )}
          </div>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
};

export default Navbar;
