import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#2C2C5C] text-white py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Branding */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-bold text-yellow-400">🍿 PopcornPages</h2>
        </div>
      
      {/* Copyright */}
      <div className="mt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} PopcornPages. All rights reserved.
      </div>

        {/* Social Icons */}
        <div className="flex space-x-6 text-yellow-400 text-xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white transition"><FaFacebookF /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition"><FaInstagram /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-white transition"><FaTwitter /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition"><FaLinkedinIn /></a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-white transition"><FaTiktok /></a>
        </div>
      </div>


    </footer>
  );
}
