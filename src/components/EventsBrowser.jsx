import React, { useState, useEffect } from "react";
import axios from "axios";
import EventsList from "./EventsList";
import Navbar from "./Navbar";
import Footer from "./Footer";

function EventsBrowser() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch events data using axios
    const fetchData = async () => {
      try {
        await axios.get("http://localhost:5000/api/events").then((response) => {
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // const toggleSearchBar = () => {
  //   setIsSearchBarVisible(!isSearchBarVisible);
  // };

  return (
    <>
      <div className="container mx-auto min-h-screen">
        {/* Added min-h-screen to container */}
        <Navbar className="p-4" />
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12 z-10">
          <div className="search-bar my-20 relative z-20">
            <div className="search-bar mb-4">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full rounded-md border-gray-300 py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="events-list">
            <EventsList events={filteredEvents} />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default EventsBrowser;
