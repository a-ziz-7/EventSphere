import React, { useState, useEffect } from "react";
import axios from "axios";
import EventsList from "./EventsList";
import Navbar from "./Navbar";

function PopularEvents() {
  const [filteredEvents, setFilteredEvents] = useState([]);
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
    // console.log(userLocation);
  }, []);

  useEffect(() => {
    console.log(userLocation);
    if (userLocation) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/events?location=${userLocation.lon},${userLocation.lat}`
          );
          console.log("Fetched events:", response.data.length);
          const sortedEvents = response.data.sort((a, b) => new Date(a.time) - new Date(b.time));
          setFilteredEvents(sortedEvents.slice(0, 28));
        } catch (error) {
          console.log("Error fetching events: ", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [userLocation]);


  if (loading) {
    return (
      <div className="text-center text-lg font-bold text-gray-700">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto min-h-screen px-4">
        <Navbar />
        <div className="events-list mt-12">
          {/* <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">
            {showingNearby
              ? "Nearby Events"
              : "No nearby events found, showing other events in other locations"}
          </h2> */}
          <EventsList events={filteredEvents} />
        </div>
      </div>
    </>
  );
}

export default PopularEvents;
