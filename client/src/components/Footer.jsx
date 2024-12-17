import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#0A0B2E] text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src="/assets/logo-removebg-preview (1).png" alt="BlueRoof" className="h-8" />
              {/* <h3 className="text-xl font-bold">BlueRoof India</h3> */}
            </div>
            <p className="text-sm text-gray-400">
              &copy; 2024 Blueroof India Pvt. Ltd.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-gray-400 hover:text-white">
                  Explore
                </Link>
              </li>
              {/* <li>
                <Link to="/profile" className="text-gray-400 hover:text-white">
                  Profile
                </Link>
              </li> */}
              {/* <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li> */}
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Social Links</h4>
            <div className="flex flex-col space-y-2">
              <a href="https://wa.me/7738434767" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white flex items-center gap-2">
                <FaWhatsapp size={20} />
                <span>WhatsApp</span>
              </a>
              <a href="https://www.instagram.com/blueroofindia?igsh=MWpyYWw4Mm5iZ2lscQ==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white flex items-center gap-2">
                <FaInstagram size={20} />
                <span>Instagram</span>
              </a>
              <a href="https://www.youtube.com/@blueroofindia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white flex items-center gap-2">
                <FaYoutube size={20} />
                <span>YouTube</span>
              </a>
            </div>
          </div>

          {/* Experience Our App */}
          {/* <div>
            <h4 className="text-lg font-semibold mb-4">Experience Our App</h4>
            <div className="flex space-x-4">
              <img src="/app-store.png" alt="App Store" className="h-10" />
              <img src="/google-play.png" alt="Google Play" className="h-10" />
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
