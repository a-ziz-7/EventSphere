import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { GoogleMap, LoadScript, InfoWindow } from "@react-google-maps/api";
import { use } from "react";

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [infoWindowPosition, setInfoWindowPosition] = useState(null);
  const [attendStatus, setAttendStatus] = useState("");
  const mapRef = useRef(null);
  const markerRef = useRef(null);

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
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          return;
        }
        
        const parsedUser = JSON.parse(storedUser);
        // console.log(response.data, parsedUser);
        if (response.data.attendies === null){
          return;
        }
        if (response.data.attendies.includes(parsedUser.id)) {
          setAttendStatus("You are attending this event" + 
            (response.data.attendies.length==1? "!":
                                                " and " + (response.data.attendies.length-1) + " other(s)!"));
          return;
        }
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    if (event && mapRef.current) {
      const { location } = event;
      const position = { lat: location[1], lng: location[0] };

      // Create the marker with the Google Maps API
      markerRef.current = new google.maps.Marker({
        position,
        map: mapRef.current,
        title: event.title || "",
      });

      // Handle marker click event
      markerRef.current.addListener("click", () => {
        setInfoWindowPosition(position);
        setInfoWindowOpen(true);
      });
    }
  }, [event]);

  useEffect(() => {
    if (event && mapRef.current) {
      const { location } = event;
      const position = { lat: location[1], lng: location[0] };

      // Create the marker with the Google Maps API
      markerRef.current = new google.maps.Marker({
        position,
        map: mapRef.current,
        title: event.title || "",
      });

      // Handle marker click event
      markerRef.current.addListener("click", () => {
        setInfoWindowPosition(position);
        setInfoWindowOpen(true);
      });
    }
  }, [event]);

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

  const sendAttend = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
          alert('Please login to attend the event');
          return;
      }
      const parsedUser = JSON.parse(storedUser);
      const response = await fetch('http://localhost:5000/api/events/attend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: parsedUser.id, eventId: eventId }), 
      });
      if (response.status === 400) {
        alert('You are already attending this event');
      } else if (response.ok) {
        // alert('You have successfully registered for the event');
        window.location.reload();
      } else {
        alert('An error occurred while trying to attend the event');
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  const cancelRSVP = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
          alert('Please login to cancel the event');
          return;
      }
      const parsedUser = JSON.parse(storedUser);
      const response = await fetch('http://localhost:5000/api/events/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: parsedUser.id, eventId: eventId }), 
      });
      if (response.ok) {
        // alert('You have successfully cancelled your RSVP');
        window.location.reload();
      } else {
        alert('An error occurred while trying to cancel your RSVP');
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  }  

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
                  onLoad={(map) => (mapRef.current = map)}
                >
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
            {event.description && (
              <div className="event-description mt-6">
                <h2 className="text-2xl font-bold mb-3">About the Event</h2>
                <p className="text-gray-700 text-base leading-relaxed">
                  {event.description}
                </p>
              </div>
            )}

            {/* Attendee List */}
            {attendStatus && (
              <div className="attend-status mt-4">
                <p className="text-green-600 font-semibold">{attendStatus}</p>
              </div>
            )}

            <div className="actions mt-6 flex flex-wrap gap-4">
              <button
                className={`text-white font-semibold py-2 px-6 rounded transition duration-300 shadow-md ${
                  attendStatus ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={attendStatus ? cancelRSVP : sendAttend}
              >
                {attendStatus ? "Cancel RSVP" : "Attend Event"}
              </button>
            </div>
   
            
          </div>
        </div>
      </div>
      {(event.thumbnail && event.thumbnail.data) && (
        <div className="container mx-auto px-4 mt-10 flex-grow">
          <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{ lat: eventLocation[1], lng: eventLocation[0] }}
              zoom={15}
              onLoad={(map) => (mapRef.current = map)}
            >
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
        </div>)}
      <Footer />
    </div>
  );
}

export default EventDetails;
