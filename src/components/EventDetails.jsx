import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/events/id/${eventId}`
        );
        setEvent(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (error) {
    return (
      <div className="container mx-auto px-4 mt-24 text-center">
        <p className="text-red-600 font-bold">Error Fetching Event:</p>
        <p className="text-gray-700">{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 mt-24 text-center">
        <p className="text-gray-700 font-semibold">Loading event...</p>
      </div>
    );
  }

  const eventDate = new Date(event.time).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const eventDateTime = new Date(event.time);

  const formattedEventTime = eventDateTime.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 mt-24">
        <div className="event-details flex flex-wrap items-center">
          {/* Event Image */}
          <div className="event-image w-full md:w-1/2">
            <img
              src={"/E.png"} // Correct file path
              alt={event.title}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Event Info */}
          <div className="event-info w-full md:w-1/2 px-4">
            <h1 className="text-4xl font-extrabold mb-4">{event.title}</h1>
            <div className="event-details-info space-y-2">
              <p className="text-gray-800 text-lg">
                <span className="font-semibold">Date:</span> {eventDate}
              </p>
              <p className="text-gray-800 text-lg">
                <span className="font-semibold">Time:</span>{" "}
                {formattedEventTime}
              </p>
              <p className="text-gray-800 text-lg">
                <span className="font-semibold">Location:</span> {event.address}
              </p>
            </div>
            <div className="event-description mt-6">
              <h2 className="text-2xl font-bold mb-3">About the Event</h2>
              <p className="text-gray-700 text-base leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="actions mt-6 flex flex-wrap gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition duration-300 shadow-md">
                Join Waitlist
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition duration-300 shadow-md">
                Buy Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
