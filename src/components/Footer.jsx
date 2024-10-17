import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

// Get current year
const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="flex bg-gradient-to-r navbar-footer-gradient text-gray-700 py-4 min-h-[7vh] justify-center mt-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Left Side: Copyright */}
        <p className="text-sm">© {currentYear} EventSphere Company, Inc</p>

        {/* Right Side: Social Media Icons */}
        <div className="flex space-x-4">
          <a
            href="#"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="#"
            className="hover:text-pink-600 transition-colors duration-300"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="#"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            <FaFacebook size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
