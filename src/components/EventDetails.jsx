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
      <div className="container mx-auto px-4 mt-24">
        {" "}
        Error Fetching event: {error.message}
      </div>
    );
  }

  if (isLoading) {
    console.log(isLoading);
    return <div className="container mx-auto px-4 mt-24">Loading event...</div>;
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
      <div className="container mx-auto px-4 mt-24">
        <div className="event-details flex flex-wrap">
          <div className="event-image w-full md:w-1/2 mb-4 md:mb-0">
            <img
              src={"party.jpg"} // Replace with your image path
              alt={event.title}
              className="w-full rounded-lg mb-4"
            />
          </div>
          <div className="event-info w-full md:w-1/2 px-4">
            <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
            <div className="event-details-info">
              <p className="text-gray-700">
                <span className="font-bold">Date:</span> {eventDate}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Time:</span> {formattedEventTime}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Location:</span> {event.address}
              </p>
            </div>
            <div className="event-description mt-4">
              <h2 className="text-2xl font-bold mb-2">About the Event</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {event.description}
              </p>
            </div>
            <div className="actions mt-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Join Waitlist
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
