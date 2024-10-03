import React from "react";

const EventsList = ({ events }) => {
  return (
    <ul className="d-flex flex-wrap justify-content-center list-unstyled mt-3">
      {events.map((event) => (
        <li
          key={event.id}
          className="mt-2 rounded list-group-item p-2 m-2"
          style={{
            fontSize: "0.9rem",
            width: "300px",
            margin: "auto",
            border: "1px solid #ccc",
          }} 
        >
          <h6 className="mb-1">{event.title}</h6>
          <p className="mb-1">Time: {new Date(event.time).toLocaleString()}</p>
          <p className="mb-1">
            Attendees: {event.attendees} / {event.limit}
          </p>
          <p className="mb-1">Address: {event.address}</p>
          <p className="mb-1">Description: {event.description}</p>
          <p className="mb-1">
            Categories:{" "}
            {typeof event.categories === "string"
              ? event.categories.split(", ").join(", ")
              : event.categories.join(", ")}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default EventsList;
