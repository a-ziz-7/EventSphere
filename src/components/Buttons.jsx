// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import EventsList from "./EventsList";

function Buttons() {
  // State to store fetched events
  const [events, setEvents] = useState([]);
  // State to store the current category selected
  const [category, setCategory] = useState("");

  // Fetch data from the backend when the category changes
  useEffect(() => {
    if (category) {
      // Make an API call to get events for the selected category
      axios
        .get(`http://localhost:5000/api/events/${category}`)
        .then((response) => {
          setEvents(response.data); // Store the events in state
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    }
  }, [category]); // The effect depends on 'category', it runs every time 'category' changes

  // Function to handle button click and set the selected category
  const handleCategoryClick = (categoryName, buttonClass) => {
    // Format category name for the API endpoint and update state
    setCategory(categoryName.toLowerCase().replace(" & ", "-"));
    // Log the class name of the clicked button for debugging
    console.log(`Button class: ${buttonClass}`);
  };

  return (
    <div className="flex flex-col items-center py-5">
      {/* Buttons to select different categories */}
      <div className="flex flex-wrap gap-2 justify-center py-3">
        <button
          className="bg-blue-500 text-white rounded-full px-3 py-2 hover:bg-blue-600 transition duration-200"
          type="button"
          onClick={(e) =>
            handleCategoryClick("Entertainment", e.target.className)
          }
        >
          Festivals/Entertainment
        </button>
        <button
          className="bg-red-500 text-white rounded-full px-3 py-2 hover:bg-red-600 transition duration-200"
          type="button"
          onClick={(e) => handleCategoryClick("Sport", e.target.className)}
        >
          Sport/Fitness
        </button>
        <button
          className="bg-green-500 text-white rounded-full px-3 py-2 hover:bg-green-600 transition duration-200"
          type="button"
          onClick={(e) => handleCategoryClick("Community", e.target.className)}
        >
          Community/Social
        </button>
        <button
          className="bg-yellow-500 text-white rounded-full px-3 py-2 hover:bg-yellow-600 transition duration-200"
          type="button"
          onClick={(e) => handleCategoryClick("Concert", e.target.className)}
        >
          Concert/Music
        </button>
        <button
          className="bg-blue-300 text-white rounded-full px-3 py-2 hover:bg-blue-400 transition duration-200"
          type="button"
          onClick={(e) => handleCategoryClick("Art", e.target.className)}
        >
          Art/Performances
        </button>

      </div>

      {/* Render the list of events once fetched */}
      <EventsList events={events} />
    </div>
  );
}

export default Buttons;
