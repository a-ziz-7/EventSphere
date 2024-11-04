import React, { useState, useEffect } from "react";
import axios from "axios";
import EventsList from "./EventsList";
import Navbar from "./Navbar";
import Footer from "./Footer";

function EventsBrowser() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Stored the current page number
  const pageSize = 20; // Number of events per page

  useEffect(() => {
    // Fetch events data using axios
    const fetchData = async () => {
      try {
        await axios
          .get("http://localhost:5000/api/events/all")
          .then((response) => {
            setEvents(response.data); // Store events in state
            setFilteredEvents(response.data); // Initialize filteredEvents with all events
            console.log(response.data);
          });
      } catch (error) {
        console.log("Error fetching events: ", error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   // Filter events based on search query only
  //   const filtered = events.filter((event) => {
  //     event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       event.description.toLowerCase().includes(searchQuery.toLowerCase());
  //   });
  //   setFilteredEvents(filtered);
  // }, [searchQuery]);

  // const handleSearchChange = (event) => {
  //   setSearchQuery(event.target.value);
  // };

  // Handle next page button click
  const handleNextPage = () => {
    if (currentPage * pageSize < events.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  // Handle previous page button click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate start and end indices for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Get the displayed events based on the current page and filtered events
  const displayedEvents = filteredEvents.slice(startIndex, endIndex);

  // const toggleSearchBar = () => {
  //   setIsSearchBarVisible(!isSearchBarVisible);
  // };

  return (
    <>
      <Navbar />
      <div className="container mx-auto min-h-screen mt-4">
        <div className="events-list mt-24">
          <EventsList events={displayedEvents} />
          <div className="pagination flex justify-between mt-2">
            <button
              disabled={currentPage === 1}
              onClick={handlePrevPage}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
              style={{ display: currentPage === 1 ? "none" : "inline-block" }}
            >
              <span>Prev</span>
            </button>
            <div className="flex justify-center">
              {/* Your events list content here */}
            </div>
            <button
              disabled={currentPage * pageSize >= events.length}
              onClick={handleNextPage}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            >
              <span>Next</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EventsBrowser;
