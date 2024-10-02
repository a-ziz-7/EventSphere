import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-white flex items-center justify-center h-screen">
      <section
        className="bg-cover bg-center w-full h-full"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        <div className="container mx-auto text-left h-full flex items-center">
          <div className="w-1/2">
            <h1
              className="text-6xl font-extrabold mb-6 text-gray-200"
              style={{
                textShadow:
                  "0.5px 0.5px 0px black, -0.5px -0.5px 0px black, 0.5px -0.5px 0px black, -0.5px 0.5px 0px black",
              }}
            >
              Welcome to <span className="text-indigo-400">EventSphere</span>
            </h1>
            <p
              className="text-2xl mb-12 text-gray-300"
              style={{
                textShadow:
                  "0.5px 0.5px 0px black, -0.5px -0.5px 0px black, 0.5px -0.5px 0px black, -0.5px 0.5px 0px black",
              }}
            >
              Explore local events effortlessly and connect with your community
              through easy event management and real-time updates.
            </p>
          </div>
          <div className="w-1/2 pl-16">
            <img
              src="https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="h-64 w-full object-cover rounded-3xl opacity-50"
              alt="Layout Image"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
