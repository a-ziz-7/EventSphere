import React, { useState, useEffect } from "react";
import axios from "axios";
import EventsList from "./EventsList";
import Navbar from "./Navbar";
import Footer from "./Footer";

function EventsBrowser() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Stored the current page number
  const pageSize = 16; // Number of events per page
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      }
    );
  }, []);

  useEffect(() => {
    // console.log("User location: ", userLocation);
    if (userLocation) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/events?location=${userLocation.lon},${userLocation.lat}`
          );
          console.log("Fetched events:", response.data.length);
          const sortedEvents = response.data.sort((a, b) => new Date(a.time) - new Date(b.time));
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
    // console.log("Events: ", events);
  }, [userLocation]);

  // Handle next page button click
  const handleNextPage = () => {
    // console.log("Current page: ", currentPage);
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
  // console.log("Displayed events: ", displayedEvents);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-700 text-lg font-bold">
        Loading...
      </div>
    );
  }

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
