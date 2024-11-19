import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const RSVP = () => {
  const navigate = useNavigate();

  const handleBrowse = () => {
    navigate("/browse"); // Navigate to the browse route
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col justify-center items-center py-8 bg-gray-100">
        <div className="w-full max-w-2xl mx-auto bg-white p-12 rounded-md shadow-md text-center">
          <p className="text-gray-700 text-lg mb-6">No RSVPs yet.</p>
          <button
            onClick={handleBrowse}
            className="bg-indigo-500 text-white text-lg font-bold py-2 px-6 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Browse Events
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RSVP;
