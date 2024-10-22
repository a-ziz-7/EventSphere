import React from "react";

const EventsList = ({ events }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {events.map((event) => (
          <li
            key={event.id}
            className="event-card w-full p-4 rounded shadow-md hover:bg-gray-100 list-none"
          >
            <h6 className="mb-1 truncate">{event.title}</h6>
            <p className="mb-1 text-sm leading-tight">
              Time: {new Date(event.time).toLocaleString()}
            </p>
            <p className="mb-1 text-sm leading-tight truncate">
              Attendees:{" "}
              {event.attendies && event.attendies.length === 0
                ? 0
                : event.attendies}{" "}
              / {event.capacity}
            </p>
            <p className="mb-1 text-sm leading-tight truncate">
              Address: {event.address}
            </p>
            <p className="mb-1 text-sm leading-tight overflow-hidden truncate hover:truncate-none">
              Description:{" "}
              {event.description ? event.description : "No description"}
            </p>
            <p className="mb-1 text-sm leading-tight">
              Categories:{" "}
              {event.categories
                .split(",")
                .map((category) => category.trim())
                .map(
                  (category) =>
                    category.charAt(0).toUpperCase() + category.slice(1)
                )
                .join(", ")}
            </p>
          </li>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
