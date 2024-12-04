import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { GoogleMap, LoadScript, MarkerF, InfoWindow } from "@react-google-maps/api";

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [infoWindowPosition, setInfoWindowPosition] = useState(null);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

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

  const eventLocation = event.location ? event.location : [40.7128, -74.0060]; // Default to New York City
  const eventTitle = event.title ? event.title : "Unnamed Event";

  const handleMarkerClick = () => {
    setInfoWindowOpen(true);
    setInfoWindowPosition({ lat: eventLocation[1], lng: eventLocation[0] });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 mt-32 flex-grow">
        <div className="event-details flex flex-wrap items-center">
          {/* Event Media (Image or Map) */}
          <div className="event-media w-full md:w-1/2">
            {event.thumbnail && event.thumbnail.data ? (
              <img
                src={`data:image/png;base64,${event.thumbnail.data}`}
                alt={event.title}
                className="w-full h-[510px] object-cover rounded-lg shadow-md"
              />
            
            ) : (
              <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={{ lat: eventLocation[1], lng: eventLocation[0] }}
                  zoom={15}
                >
                  <MarkerF
                    position={{ lat: eventLocation[1], lng: eventLocation[0] }}
                    title={eventTitle || ""}
                    onClick={handleMarkerClick}
                    options={{
                      clickable: true,
                      optimized: true,
                      title: null,
                    }}
                  />
                  {infoWindowOpen && infoWindowPosition && (
                    <InfoWindow
                      position={infoWindowPosition}
                      onCloseClick={() => setInfoWindowOpen(false)} // Close InfoWindow
                    >
                      <div>
                        <h3>{eventTitle}</h3>
                        <p>{event.address}</p>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open in Google Maps
                        </a>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </LoadScript>
            )}
          </div>

          {/* Event Info */}
          <div className="event-info w-full md:w-1/2 px-4">
            <h1 className="text-4xl font-extrabold mb-4">{event.title}</h1>
            <div className="event-details-info space-y-2">
              <p className="text-gray-800 text-lg">
                <span className="font-semibold">Date:</span> {eventDate}
              </p>
              <p className="text-gray-800 text-lg">
                <span className="font-semibold">Time:</span> {formattedEventTime}
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
      <Footer />
    </div>
  );
}

export default EventDetails;
