import React from "react";

const EventsList = ({ events }) => {
  const handleCardClick = (id) => {
    // console.log(`${id}`);
    fetch(`http://localhost:5000/api/events/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error fetching event data:', error);
    });
  };

  return (
    <div className="container mx-auto px-4">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {events.map((event) => (
          <li
            key={event.id}
            onClick={() => handleCardClick(event.id)}
            className="event-card w-full p-4 rounded-lg shadow-md transition-transform duration-300 ease-in-out bg-white border border-gray-300 hover:bg-blue-200 hover:shadow-xl hover:border-blue-400 transform hover:-translate-y-1 cursor-pointer"
          >
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
        ))}
      </ul>
    </div>
  );
};

export default EventsList;
