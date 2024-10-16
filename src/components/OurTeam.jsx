// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "./Navbar";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function OurTeam() {
  // This array contains data for each team member, feel free to change or add anything
  // const teamMembers = [
  //   {
  //     name: "Carlo Ace Sagad",
  //     title: "Developer",
  //     bio: "",
  //     image: "person-icon.png",
  //   },
  //   {
  //     name: "Aziz Abdusamiev",
  //     title: "Developer",
  //     bio: "",
  //     image: "person-icon.png",
  //   },
  //   {
  //     name: "Steven Henry",
  //     title: "Developer",
  //     bio: "",
  //     image: "person-icon.png",
  //   },
  //   {
  //     name: "Joel Diaz",
  //     title: "Developer",
  //     bio: "",
  //     image: "person-icon.png",
  //   },
  // ];
  // return (
  //   <div className=".gradient-background">
  //     <Navbar />
  //     <div className="mt-20">
  //       <h1 classNameName="text-center gradient-text">
  //         <span classNameName="gradient-text text-center">Meet Our Team</span>
  //       </h1>
  //       <div className="row">
  //         {/* map through the team members and display content */}
  //         {teamMembers.map((member) => (
  //           <div className="team-members col-md-3 col-sm-6 mt-5">
  //             <div classNameName="team-member">
  //               <img
  //                 src={member.image}
  //                 alt={member.name}
  //                 width="150"
  //                 height="150"
  //               />
  //               <h3>{member.name}</h3>
  //               <p>{member.title}</p>
  //               <p>{member.bio}</p>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );
  const teamMembers = [
    {
      name: "Carlo Ace Sagad",
      role: "Developer",
      imgSrc: "E.png",
      github: "https://github.com/carloace16",
      linkedin: "https://www.linkedin.com/in/carlo-ace-sagad-223a72155/",
    },
    {
      name: "Aziz Abdusamiev",
      role: "Developer",
      imgSrc: "E.png",
      github: "https://github.com/aziz-abdusamiev",
      linkedin: "https://linkedin.com/in/aziz-abdusamiev",
    },
    {
      name: "Steven Henry",
      role: "Developer",
      imgSrc: "E.png",
      github: "https://github.com/steven-henry",
      linkedin: "https://linkedin.com/in/steven-henry",
    },
    {
      name: "Joel Diaz",
      role: "Developer",
      imgSrc: "E.png",
      github: "https://github.com/joel-diaz",
      linkedin: "https://linkedin.com/in/joel-diaz",
    },
  ];
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
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
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <FaLinkedin size={24} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default OurTeam;
