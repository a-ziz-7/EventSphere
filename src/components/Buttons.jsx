// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import EventsList from "./EventsList";

function Buttons({ setIsCategorySelected }) {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (category) {
      axios
        .get(`http://localhost:5000/api/events/category/${category}`)
        .then((response) => {
          setEvents(response.data);
          setIsCategorySelected(true); // Notify Home component that a category is selected
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    }
  }, [category, setIsCategorySelected]);

  const handleCategoryClick = (categoryName) => {
    setCategory(categoryName.toLowerCase().replace(" & ", "-"));
  };

  return (
    <div className="flex flex-col items-center py-5">
      <div className="flex flex-wrap gap-2 justify-center py-3">
        <button
          className="bg-blue-500 text-white rounded-full px-3 py-2 hover:bg-blue-600 transition duration-200"
          type="button"
          onClick={() => handleCategoryClick("Entertainment")}
        >
          Festivals/Entertainment
        </button>
        <button
          className="bg-red-500 text-white rounded-full px-3 py-2 hover:bg-red-600 transition duration-200"
          type="button"
          onClick={() => handleCategoryClick("Sport")}
        >
          Sport/Fitness
        </button>
        <button
          className="bg-green-500 text-white rounded-full px-3 py-2 hover:bg-green-600 transition duration-200"
          type="button"
          onClick={() => handleCategoryClick("Community")}
        >
          Community/Social
        </button>
        <button
          className="bg-yellow-500 text-white rounded-full px-3 py-2 hover:bg-yellow-600 transition duration-200"
          type="button"
          onClick={() => handleCategoryClick("Concert")}
        >
          Concert/Music
        </button>
        <button
          className="bg-blue-300 text-white rounded-full px-3 py-2 hover:bg-blue-400 transition duration-200"
          type="button"
          onClick={() => handleCategoryClick("Art")}
        >
          Art/Performances
        </button>
      </div>
      <EventsList events={events} />
    </div>
  );
}

export default Buttons;
