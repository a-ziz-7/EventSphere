import React from "react";
import { Link, useNavigate } from "react-router-dom";

const EventsList = ({ events }) => {
  const navigate = useNavigate();

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="container mx-auto px-4">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {events.map((event) => (
          <Link
            to={`/event/${event.id}`}
            onClick={() => handleEventClick(event.id)}
            className="no-underline"
            key={event.id} // Ensure unique key here
          >
            <li className="event-card w-full p-4 rounded-lg shadow-md transition-transform duration-300 ease-in-out bg-white border border-gray-300 hover:bg-blue-200 hover:shadow-xl hover:border-blue-400 transform hover:-translate-y-1 cursor-pointer">
              {/* Display Image if Available */}
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover mb-4 rounded-md"
                />
              )}
              <h6 className="mb-1 font-medium text-blue-800 truncate">
                {event.title}
              </h6>
              <p className="mb-1 text-sm text-gray-700">
                Time:{" "}
                <span className="font-semibold">
                  {new Date(event.time).toLocaleString()}
                </span>
              </p>
              <p className="mb-1 text-sm text-gray-700">
                Attendees:{" "}
                <span className="font-semibold">
                  {event.attendies && event.attendies.length === 0
                    ? 0
                    : event.attendies}
                </span>{" "}
                / {event.capacity}
              </p>
              <p className="mb-1 text-sm text-gray-700">
                Address: <span className="font-semibold">{event.address}</span>
              </p>
              <p className="mb-1 text-sm text-gray-700 overflow-hidden truncate hover:truncate-none">
                Description:{" "}
                <span className="font-semibold">
                  {event.description ? event.description : "No description"}
                </span>
              </p>
              <p className="mb-1 text-sm text-gray-700">
                Categories:{" "}
                <span className="font-semibold">
                  {event.categories
                    .split(",")
                    .map((category) => category.trim())
                    .map(
                      (category) =>
                        category.charAt(0).toUpperCase() + category.slice(1)
                    )
                    .join(", ")}
                </span>
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default EventsList;
