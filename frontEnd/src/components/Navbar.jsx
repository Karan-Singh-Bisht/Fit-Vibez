import React, { useState } from "react";
import { FaPaperPlane, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navbarOptions = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Contact", href: "/contact" },
  ];

  return (
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
          <button className="text-[#949391] bg-[#1A1A1A] py-2 px-4 text-sm font-bold rounded-md hover:bg-[#333] transition">
            FAQ
          </button>
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
          <button className="mt-4 text-[#949391] bg-[#1A1A1A] py-2 px-4 text-sm font-bold rounded-md hover:bg-[#333] transition">
            FAQ
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
