import React from "react";
import Navbar from "./Navbar";

function OurTeam() {
  // This array contains data for each team member, feel free to change or add anything
  const teamMembers = [
    {
      name: "Carlo Ace Sagad",
      title: "Developer",
      bio: "",
      image: "person-icon.png",
    },
    {
      name: "Aziz Abdusamiev",
      title: "Developer",
      bio: "",
      image: "person-icon.png",
    },
    {
      name: "Steven Henry",
      title: "Developer",
      bio: "",
      image: "person-icon.png",
    },
    {
      name: "Joel Diaz",
      title: "Developer",
      bio: "",
      image: "person-icon.png",
    },
  ];

  return (
    <div className="our-team-gradient">
      <Navbar />
      <div className="mt-20">
        <h1 className="text-center gradient-text">
          <span className="gradient-text">Meet Our Team</span>
        </h1>
        <div className="row">
          {/* map through the team members and display content */}
          {teamMembers.map((member) => (
            <div className="team-members col-md-3 col-sm-6 mt-5">
              <div className="team-member">
                <img
                  src={member.image}
                  alt={member.name}
                  width="150"
                  height="150"
                />
                <h3>{member.name}</h3>
                <p>{member.title}</p>
                <p>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurTeam;
