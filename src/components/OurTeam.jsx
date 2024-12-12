// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function OurTeam() {
  const teamMembers = [
    {
      name: "Carlo Ace Sagad",
      role: "Front-End Developer",
      imgSrc: "Ace.jpg",
      github: "https://github.com/carloace16",
      linkedin: "https://www.linkedin.com/in/carlo-ace-sagad-223a72155/",
    },
    {
      name: "Aziz Abdusamiev",
      role: "Back-End Developer",
      imgSrc: "Aziz.png",
      github: "https://github.com/a-ziz-7",
      linkedin: "https://linkedin.com/in/aziz-abdusamiev",
    },
    {
      name: "Steven Henry",
      role: "Back-End Developer",
      imgSrc: "steven.png",
      github: "https://github.com/steven-henry",
      linkedin: "https://www.linkedin.com/in/stevenhenry012/",
    },
    {
      name: "Joel Diaz",
      role: "Front-End Developer",
      imgSrc: "Joel.png",
      github: "https://github.com/joel-diaz",
      linkedin: "https://linkedin.com/in/joel-diaz",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div className="text-center pb-12">
          <h2 className="text-base font-bold text-indigo-600 pt-5 mt-4">
            We have the best team!
          </h2>
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900">
            Check our awesome team members
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center border-4 border-gray-200"
            >
              <div className="mb-8">
                <img
                  className="object-center object-cover rounded-full h-36 w-36 border-4 border-indigo-200"
                  src={member.imgSrc}
                  alt={member.name}
                />
              </div>
              <div className="text-center">
                <p className="text-xl text-gray-700 font-bold mb-2">
                  {member.name}
                </p>
                <p className="text-base text-gray-400 font-normal">
                  {member.role}
                </p>
                <div className="flex justify-center mt-4 space-x-4">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <FaGithub size={24} />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-indigo-700"
                  >
                    <FaLinkedin size={24} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default OurTeam;
