import React from "react";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";
import { useLocation, useNavigate } from "react-router-dom";
import DonateModal from "./DonateModal";

export default function AuthModal() {
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/signup" && <SignUpModal />}

      {location.pathname === "/login" && <LoginModal />}

      {location.pathname === "/donate" && <DonateModal />}
    </div>
  );
}
