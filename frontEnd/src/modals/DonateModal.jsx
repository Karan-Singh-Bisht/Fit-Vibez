import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../state/Auth/userAuthSlice"; // Assuming correct action
import { Toaster, toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginModal() {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/donate") {
      setOpen(true);
    }
  }, [location]);

  const handleClose = () => {
    setOpen(false);
    navigate("/"); // Redirect after closing modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userCredentials = { value };
    // const response = await dispatch(loginUser(userCredentials));

    // if (response.meta.requestStatus === "fulfilled") {
    //   toast.success(
    //     `Welcome, ${response.payload.userDetails.userName.firstName}`
    //   );
    //   handleClose();
    // } else {
    //   toast.error(response.payload.message);
    // }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#0F1112] w-full max-w-md md:max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-white text-xl font-semibold mb-4 text-center">
          Donate
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-white">Value</label>
            <input
              onChange={(e) => setValue(e.target.value)}
              type="number"
              className="w-full p-2 rounded-md bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Donate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
