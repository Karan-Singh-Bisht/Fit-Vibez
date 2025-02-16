import { FaPaperPlane } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-white py-6 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
        {/* Left Section */}
        <div className="flex flex-col space-y-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <FaPaperPlane />
          </div>
          <p className="text-sm text-gray-400">
            © 2025 Fit Vibez, Inc. <br />
            All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="text-gray-400 space-y-2">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Products</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

        {/* Our Services */}
        <div>
          <h3 className="text-white font-semibold mb-3">Our Services</h3>
          <ul className="text-gray-400 space-y-2">
            <li>
              <a href="#">Fitness Challenges</a>
            </li>
            <li>
              <a href="#">Rewards Program</a>
            </li>
            <li>
              <a href="#">Community</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h3 className="text-white font-semibold mb-3">Connect With Us</h3>
          <ul className="text-gray-400 space-y-2">
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
