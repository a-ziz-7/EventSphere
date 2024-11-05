import React, { useState, useEffect } from "react";
import axios from "axios";
import EventsList from "./EventsList";
import Navbar from "./Navbar";

function PopularEvents() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showingNearby, setShowingNearby] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting user location: ", error);
        setUserLocation({ lat: 40.7128, lon: -74.006 });
      }
    );
    console.log(userLocation);
  }, []);

  useEffect(() => {
    console.log(userLocation);
    if (userLocation) {
      // alert(userLocation.lat +"   "+userLocation.lon);
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/events?location=${userLocation.lon},${userLocation.lat}`
          );
          console.log("Fetched events:", response.data.length);
          setEvents(response.data);
          filterEvents(response.data);
        } catch (error) {
          console.log("Error fetching events: ", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [userLocation]);

  const filterEvents = (allEvents) => {
    if (!userLocation) return;
    const maxDistance = 50;

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const nearbyEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.time);
      const isInDateRange = eventDate >= today && eventDate <= tomorrow;
      // console.log(event)
      // console.log(event.location);

      const eventLocation = { lat: event.latitude, lon: event.longitude };

      const isNearLocation =
        calculateDistance(
          userLocation.lat,
          userLocation.lon,
          eventLocation.lat,
          eventLocation.lon
        ) <= maxDistance;

      return isInDateRange && isNearLocation;
    });

    if (nearbyEvents.length === 0) {
      console.log("No nearby events found. Showing other events.");
      setShowingNearby(false);
      const otherEvents = allEvents.slice(0, 16);
      setFilteredEvents(otherEvents);
    } else {
      console.log("Nearby events found.");
      setShowingNearby(true);
      setFilteredEvents(nearbyEvents.slice(0, 16));
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toRad = (value) => {
    return (value * Math.PI) / 180;
  };

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
