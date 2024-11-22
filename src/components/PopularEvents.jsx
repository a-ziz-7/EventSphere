import React, { useState, useEffect } from "react";
import axios from "axios";
import EventsList from "./EventsList";
import Navbar from "./Navbar";
import popularEventImages from "./popularEventImages";

function PopularEvents() {
  const [filteredEvents, setFilteredEvents] = useState([]);
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
            `http://localhost:5000/api/events?location=${userLocation.lon},${userLocation.lat}`
          );
          const sortedEvents = response.data.sort(
            (a, b) => new Date(a.time) - new Date(b.time)
          );

          // Map the 16 images to the top 16 events
          const eventsWithImages = sortedEvents
            .slice(0, 16)
            .map((event, index) => ({
              ...event,
              image: popularEventImages[index] || null, // Assign images only if available
            }));

          setFilteredEvents(eventsWithImages);
        } catch (error) {
          console.error("Error fetching events: ", error);
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
          <EventsList events={filteredEvents} />
        </div>
      </div>
    </>
  );
}

export default PopularEvents;
