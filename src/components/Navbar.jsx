import React, { useState } from "react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className="navbar-footer-gradient flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-10 w-auto rounded-lg"
              src="E.png"
              alt="Your Company Logo"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <a
            href="Home"
            className="text-base font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Home
          </a>
          <a
            href="browse"
            className="text-base font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Browse Events
          </a>
          <a
            href="rsvp"
            className="text-base font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            RSVP
          </a>
          <a
            href="team"
            className="text-base font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Our Team
          </a>
          <a
            href="terms"
            className="text-base font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Terms
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-4">
          <a
            href="login"
            className="text-lg font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition duration-300 ease-in-out"
          >
            Log in
          </a>
          <a
            href="signup"
            className="text-lg font-semibold rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 transition duration-300 ease-in-out"
          >
            Sign up
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden navbar-footer-gradient">
          <div className="space-y-2 px-2 pb-3 pt-2">
            <a
              href="home"
              className="block rounded-md px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200"
            >
              Home
            </a>
            <a
              href="browse"
              className="block rounded-md px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200"
            >
              Browse Events
            </a>
            <a
              href="rsvp"
              className="block rounded-md px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200"
            >
              RSVP
            </a>
            <a
              href="team"
              className="block rounded-md px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200"
            >
              Our Team
            </a>
            <a
              href="terms"
              className="block rounded-md px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200"
            >
              Terms
            </a>
            <a
              href="login"
              className="block rounded-md px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200"
            >
              Log in
            </a>
            <a
              href="signup"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Sign up
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
