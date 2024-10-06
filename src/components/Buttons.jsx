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
      axios.get(`http://localhost:5000/api/events/${category}`)
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
    setCategory(categoryName.toLowerCase().replace(' & ', '-'));
    // Log the class name of the clicked button for debugging
    console.log(`Button class: ${buttonClass}`);
  };

  return (
    <div className="d-flex flex-column align-items-center py-5">
      {/* Buttons to select different categories */}
      <div className="d-flex gap-2 justify-content-center py-3">
        <button className="btn btn-primary rounded-pill px-3" type="button" onClick={(e) => handleCategoryClick("Entertainment", e.target.className)}>
          Festivals/Entertainment
        </button>
        <button className="btn btn-danger rounded-pill px-3" type="button" onClick={(e) => handleCategoryClick("Sport", e.target.className)}>
          Sport/Fitness
        </button>
        <button className="btn btn-success rounded-pill px-3" type="button" onClick={(e) => handleCategoryClick("Community", e.target.className)}>
          Community/Social
        </button>
        <button className="btn btn-warning rounded-pill px-3" type="button" onClick={(e) => handleCategoryClick("Concert", e.target.className)}>
          Concert/Music
        </button>
        <button className="btn btn-info rounded-pill px-3" type="button" onClick={(e) => handleCategoryClick("Art", e.target.className)}>
          Art/Exhibitions
        </button>
        <button className="btn btn-light rounded-pill px-3" type="button" onClick={(e) => handleCategoryClick("Holiday", e.target.className)}>
          Holidays/Family
        </button>
        {/* <button className="btn btn-dark rounded-pill px-3" type="button" onClick={(e) => handleCategoryClick("Food & Drinks", e.target.className)}>
          Food & Drinks
        </button> */}
      </div>

      {/* Render the list of events once fetched */}
      {/* Make sure to render them in proper portion of the page and style it the way you want */}
      <EventsList events={events}/>
    </div>
  );
}

export default Buttons;
