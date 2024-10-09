import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

function Footer() {
  return (
    <section
      id="footer"
      className="bg-gradient-to-r navbar-footer-gradient mb-0 pb-0"
    >
      <div className="container mx-auto mt-4">
        <footer className="flex flex-wrap justify-between items-center py-6 my-0">
          <div className="flex items-center">
            <a href="/" className="text-white text-lg mr-3">
              <svg className="w-8 h-8">
                <use xlinkHref="#bootstrap"></use>
              </svg>
            </a>
            <span className="text-gray-900">
              © 2024 EventSphere Company, Inc
            </span>
          </div>

          <ul className="flex space-x-6">
            <li>
              <a href="#" className="text-gray-900">
                <FaTwitter size={24} />
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-900">
                <FaInstagram size={24} />
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-900">
                <FaFacebook size={24} />
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </section>
  );
}

export default Footer;
