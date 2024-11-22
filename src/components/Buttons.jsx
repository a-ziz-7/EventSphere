import React, { useState, useEffect } from "react";
import axios from "axios";
import EventsList from "./EventsList";

function Buttons({ setIsCategorySelected }) {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track total number of pages
  const pageSize = 16; // Number of events per page

  useEffect(() => {
    if (category) {
      axios
        .get(`http://localhost:5000/api/events/category/${category}`)
        .then((response) => {
          setEvents(response.data);
          setTotalPages(Math.ceil(response.data.length / pageSize)); // Calculate total pages
          setIsCategorySelected(true); // Notify Home component that a category is selected
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    }
  }, [category, setIsCategorySelected]);

  const handleCategoryClick = (categoryName) => {
    setCategory(categoryName.toLowerCase().replace(" & ", "-"));
    setCurrentPage(1); // Reset to page 1 when a new category is selected
  };

  // Handle next page button click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page button click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center py-5">
      <div className="flex flex-wrap gap-4 justify-center py-3">
        <button
          className="bg-indigo-500 text-white rounded-lg px-5 py-3 hover:bg-indigo-600 transition duration-300 transform hover:scale-105"
          type="button"
          onClick={() => handleCategoryClick("Entertainment")}
        >
          Festivals/Entertainment
        </button>
        <button
          className="bg-red-500 text-white rounded-lg px-5 py-3 hover:bg-red-600 transition duration-300 transform hover:scale-105"
          type="button"
          onClick={() => handleCategoryClick("Sport")}
        >
          Sport/Fitness
        </button>
        <button
          className="bg-green-500 text-white rounded-lg px-5 py-3 hover:bg-green-600 transition duration-300 transform hover:scale-105"
          type="button"
          onClick={() => handleCategoryClick("Community")}
        >
          Community/Social
        </button>
        <button
          className="bg-yellow-500 text-white rounded-lg px-5 py-3 hover:bg-yellow-600 transition duration-300 transform hover:scale-105"
          type="button"
          onClick={() => handleCategoryClick("Concert")}
        >
          Concert/Music
        </button>
        <button
          className="bg-blue-400 text-white rounded-lg px-5 py-3 hover:bg-blue-500 transition duration-300 transform hover:scale-105"
          type="button"
          onClick={() => handleCategoryClick("Art")}
        >
          Art/Performances
        </button>
      </div>

      {category && (
        <div>
          <EventsList
            events={events.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )}
          />
          <div className="pagination flex justify-between mt-6 items-center">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l hover:bg-gray-400 transition duration-200"
            >
              Prev
            </button>
            <div className="text-center font-medium">
              {currentPage} / {totalPages} pages
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r hover:bg-gray-400 transition duration-200"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Buttons;
