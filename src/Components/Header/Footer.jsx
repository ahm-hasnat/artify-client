import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaGithub
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#666666] text-gray-200 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">Artify</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-200">
            Preserving history and making artifacts accessible to everyone.
            Explore relics, stories, and discoveries from across the world.
          </p>
          <div className="flex gap-3 mt-4">
            <a className="p-2 rounded-full bg-white/20 hover:bg-white/30">
              <FaFacebookF />
            </a>
            <a className="p-2 rounded-full bg-white/20 hover:bg-white/30">
              <FaTwitter />
            </a>
            <a className="p-2 rounded-full bg-white/20 hover:bg-white/30">
              <FaInstagram />
            </a>
            <a className="p-2 rounded-full bg-white/20 hover:bg-white/30">
              <FaPinterestP />
            </a>
            <a className="p-2 rounded-full bg-white/20 hover:bg-white/30">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="hover:text-yellow-300">Home</a>
            </li>
            <li>
              <a className="hover:text-yellow-300">Browse Artifacts</a>
            </li>
            <li>
              <a className="hover:text-yellow-300">Collections</a>
            </li>
            <li>
              <a className="hover:text-yellow-300">Timeline</a>
            </li>
            <li>
              <a className="hover:text-yellow-300">About Us</a>
            </li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-3">
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="hover:text-yellow-300">Top Rated</a>
            </li>
            <li>
              <a className="hover:text-yellow-300">Recent Discoveries</a>
            </li>
            <li>
              <a className="hover:text-yellow-300">Rare Artifacts</a>
            </li>
            <li>
              <a className="hover:text-yellow-300">Contribute</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-3">
            Contact Us
          </h3>
          <p className="text-sm">123 Museum Drive, Cultural District</p>
          <p className="text-sm">+1 (555) 123-4567</p>
          <p className="text-sm">info@artify.com</p>
        </div>
      </div>

      
      <div className="mt-10 border-t border-white/10 pt-4 text-center
       text-sm text-gray-300">
        © {new Date().getFullYear()} Artify — Historical Artifacts Tracker.
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
