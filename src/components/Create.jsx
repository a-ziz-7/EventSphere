import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [capacity, setCapacity] = useState("");
  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const categoryOptions = [
    "Festival",
    "Entertainment",
    "Sport",
    "Fitness",
    "Community",
    "Social",
    "Concert",
    "Music",
    "Art",
    "Performance",
  ];

  const stateOptions = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      title,
      description,
      time,
      duration,
      address,
      state,
      capacity,
      categories: categories.join(","), // Convert categories array to a comma-separated string
      thumbnail,
    };
    console.log("Event Data:", eventData);
    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        body: eventData,
        credentials: "include", // Ensure cookies are sent with the request
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Event created successfully:", result);
        alert("Event created successfully!");
      } else {
        const error = await response.text();
        console.error("Error creating event:", error);
        alert(`Failed to create event: ${error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred.");
    }
  };

  const handleCategoryToggle = (category) => {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gray-100">
        <div className="flex-grow flex justify-center items-center">
          <div className="w-full max-w-6xl bg-white p-10 rounded-lg shadow-lg space-y-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Create Event
            </h1>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Top Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Title:
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Description:
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Right-Side Fields */}
                <div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Time:
                    </label>
                    <input
                      type="datetime-local"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                      className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Duration (hours):
                    </label>
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      required
                      className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Address:
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      placeholder="123 Main St, Springfield, IL"
                      className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      State:
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                      className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a State</option>
                      {stateOptions.map((stateOption) => (
                        <option key={stateOption} value={stateOption}>
                          {stateOption}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Capacity:
                    </label>
                    <input
                      type="number"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      required
                      className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Left-Side Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Categories:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categoryOptions.map((category) => {
                        const randomColor =
                          colors[Math.floor(Math.random() * colors.length)];
                        return (
                          <button
                            type="button"
                            key={category}
                            onClick={() => handleCategoryToggle(category)}
                            className={`px-4 py-2 border rounded-lg shadow-sm focus:outline-none ${
                              categories.includes(category)
                                ? `${randomColor} text-white`
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {category}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Thumbnail:
                    </label>
                    <input
                      type="file"
                      onChange={handleThumbnailChange}
                      accept="image/*"
                      className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
              >
                Create Event
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CreateEvent;
