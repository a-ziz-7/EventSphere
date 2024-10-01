// eslint-disable-next-line no-unused-vars
import React from "react";

function Header() {
  return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none"
      >
        <svg className="bi me-2 " width="40" height="32">
          <use xlinkHref="#bootstrap"></use>
        </svg>
        <span className="fs-4 event-sphere ">Event Sphere</span>
      </a>

      <ul className="nav nav-pills">
        <li className="nav-item">
          <a href="#" className="nav-link active" aria-current="page">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            Browse Events
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            About
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            Meet Our Team
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            Faqs
          </a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
