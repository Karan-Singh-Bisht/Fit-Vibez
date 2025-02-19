import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../state/Auth/userAuthSlice";
import { Toaster, toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";

export default function SignUpModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Automatically open the modal when the user is on /signup
  useEffect(() => {
    if (location.pathname === "/signup") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      userName: { firstName, lastName },
      email,
      password,
    };
    const response = await dispatch(registerUser(user));
    if (response.meta.requestStatus === "fulfilled") {
      await toast.success("Registration successful!");
      navigate("/");
    } else {
      toast.error(response.payload.message);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#0F1112] w-full max-w-md md:max-w-lg p-6 rounded-lg shadow-lg">
            <h2 className="text-white text-xl font-semibold mb-4 text-center">
              Sign Up
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First & Last Name */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-white">First Name</label>
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    className="w-full p-2 rounded-md bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-white">Last Name</label>
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    className="w-full p-2 rounded-md bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-white">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full p-2 rounded-md bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-white">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full p-2 rounded-md bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Submit & Close Buttons */}
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
                <p className="text-white">
                  Already have an account?{" "}
                  <span
                    className="text-blue-400 hover:cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </span>
                </p>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}
