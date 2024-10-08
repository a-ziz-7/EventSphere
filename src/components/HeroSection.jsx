import React from "react";
const HeroSection = () => {
  return (
    <div className="bg-white flex items-center justify-center h-screen">
      <section
        className="bg-cover bg-center w-full h-full"
        style={{
          backgroundImage: "url('party.jpg')",
        }}
      >
        <div className="container mx-auto text-left h-full flex items-center">
          <div className="w-full">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-9xl">
              Welcome to{" "}
              <span
                className="gradient-text"
                style={{
                  background:
                    "linear-gradient(to right, #f64f59, #c471ed, #12c2e9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent", // Ensures no color conflicts
                }}
              >
                EventSphere
              </span>
            </h1>
            <p
              className="text-2xl mb-12 text-white w-full md:w-1/2 lg:w-1/3"
              style={{
                textShadow:
                  "0.5px 0.5px 0px black, -0.5px -0.5px 0px black, 0.5px -0.5px 0px black, -0.5px 0.5px 0px black",
              }}
            >
              Explore local events effortlessly and connect with your community
              through easy event management and real-time updates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
