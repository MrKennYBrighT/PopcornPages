// Importing social media icons from react-icons library
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
// Importing Link for internal navigation
import { Link } from 'react-router-dom';

// Functional component for the website footer
export default function Footer() {
  return (
    // Footer container with background color, padding, and white text
    <footer className="bg-[#2C2C5C] text-white py-8 px-4">
      {/* Responsive layout container */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Branding section with logo/title */}
        <div className="mb-4 md:mb-0 text-center md:text-left flex items-center space-x-2">
          <img src="/favicon.ico" alt="Popcorn Logo" className="w-6 h-6" />
          <h2 className="text-xl font-bold text-yellow-400">PopcornPages</h2>
        </div>
      
        {/* Copyright notice with dynamic year */}
        <div className="mt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} PopcornPages. All rights reserved.
        </div>

        {/* Social media icons with links */}
        <div className="flex space-x-6 text-yellow-400 text-xl">
          {/* Facebook icon with link */}
          <Link
            to="/comingsoon"
            aria-label="Facebook"
            className="hover:text-white transition"
          >
            <FaFacebookF />
          </Link>

          {/* Instagram icon with link */}
          <Link
            to="/comingsoon"
            aria-label="Instagram"
            className="hover:text-white transition"
          >
            <FaInstagram />
          </Link>

          {/* Twitter icon with link */}
          <Link
            to="/comingsoon"
            aria-label="Twitter"
            className="hover:text-white transition"
          >
            <FaTwitter />
          </Link>

          {/* LinkedIn icon with link */}
          <Link
            to="/comingsoon"
            aria-label="LinkedIn"
            className="hover:text-white transition"
          >
            <FaLinkedinIn />
          </Link>

          {/* TikTok icon with link */}
          <Link
            to="/comingsoon"
            aria-label="TikTok"
            className="hover:text-white transition"
          >
            <FaTiktok />
          </Link>
        </div>
      </div>
    </footer>
  );
}
