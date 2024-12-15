import React, { useState, useEffect } from "react";
import axios from "axios";
import EventsList from "./EventsList";
import Footer from "./Footer";

function EventsBrowser() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page number
  const pageSize = 16; // Number of events per page
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (userLocation) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/events?location=${userLocation.lon},${userLocation.lat}`
          );
          const sortedEvents = response.data.sort(
            (a, b) => new Date(a.time) - new Date(b.time)
          );
          setEvents(sortedEvents);
          setFilteredEvents(sortedEvents);
        } catch (error) {
          console.log("Error fetching events: ", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [userLocation]);

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

  // Calculate total pages
  const totalPages = Math.ceil(filteredEvents.length / pageSize);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-700 text-lg font-bold">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto min-h-screen mt-4">
        {/* Add the header */}
        <h1 className="text-center text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mt-36">
          All Events <span className="badge text-bg-secondary">Browse Now</span>
        </h1>

        <div className="events-list mt-16">
          <EventsList events={displayedEvents} />
          <div className="pagination flex justify-between mt-8 items-center">
            {/* Previous Button */}
            <button
              disabled={currentPage === 1}
              onClick={handlePrevPage}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
              style={{ display: currentPage === 1 ? "none" : "inline-block" }}
            >
              <span>Prev</span>
            </button>

            {/* Page Number Display (always centered) */}
            <div className="flex-1 text-center">
              <span>
                {currentPage} / {totalPages} pages
              </span>
            </div>

            {/* Next Button */}
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
