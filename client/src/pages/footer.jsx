import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';
import img1 from '../assets/logo-removebg-preview (1).png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left: Logo & Social Links */}
        <div className="flex flex-col">
          <div className="mb-4">
            {/* Replace with your logo */}
            <img src={img1} alt="Company Logo" className="h-10" />
          </div>
          <div className="flex space-x-4 mb-4">
            {/* Social Links */}
            <a href="#" aria-label="Facebook">
              <FaFacebook className="text-2xl hover:text-[#ff6a35]" />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram className="text-2xl hover:text-[#ff6a35]" />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter className="text-2xl hover:text-[#ff6a35]" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin className="text-2xl hover:text-[#ff6a35]" />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube className="text-2xl hover:text-[#ff6a35]" />
            </a>
          </div>
          <p className="text-sm">© 2012-2024 Blue Roof Pvt. Ltd.</p>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1">
            <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">For Partners</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Annual Return</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Unsubscribe</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Merger Hearing Advertisement</a></li>
          </ul>
        </div>

        {/* Partner Sites */}
        <div>
          <h4 className="font-semibold mb-2">Partner Sites</h4>
          <ul className="space-y-1">
            <li><a href="#" className="text-gray-400 hover:text-white">Proptiger</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Makaan</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">realestate.com.au</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">realtor.com</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">99.co</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">collinsdictionary.com</a></li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-semibold mb-2">Explore</h4>
          <ul className="space-y-1">
            <li><a href="#" className="text-gray-400 hover:text-white">News</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Home Loans</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Sitemap</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">International</a></li>
          </ul>
          <div className="mt-4">
            <h5 className="font-semibold mb-1">Experience Our App</h5>
            <div className="flex space-x-2">
              <a href="#"><img src="path-to-appstore-icon.png" alt="App Store" className="h-8" /></a>
              <a href="#"><img src="path-to-googleplay-icon.png" alt="Google Play" className="h-8" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
