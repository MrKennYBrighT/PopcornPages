// Importing social media icons from react-icons library
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaTiktok } from 'react-icons/fa';

// Functional component for the website footer
export default function Footer() {
  return (
    // Footer container with background color, padding, and white text
    <footer className="bg-[#2C2C5C] text-white py-8 px-4">
      {/* Responsive layout container */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Branding section with logo/title */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-bold text-yellow-400">🍿 PopcornPages</h2>
        </div>
      
        {/* Copyright notice with dynamic year */}
        <div className="mt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} PopcornPages. All rights reserved.
        </div>

        {/* Social media icons with links */}
        <div className="flex space-x-6 text-yellow-400 text-xl">
          {/* Facebook icon with link */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-white transition"
          >
            <FaFacebookF />
          </a>

          {/* Instagram icon with link */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-white transition"
          >
            <FaInstagram />
          </a>

          {/* Twitter icon with link */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-white transition"
          >
            <FaTwitter />
          </a>

          {/* LinkedIn icon with link */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white transition"
          >
            <FaLinkedinIn />
          </a>

          {/* TikTok icon with link */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="hover:text-white transition"
          >
            <FaTiktok />
          </a>
        </div>
      </div>
    </footer>
  );
}
