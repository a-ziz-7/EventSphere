// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "./Navbar";
import Buttons from "./Buttons";
import Footer from "./Footer";
import HeroSection from "./HeroSection";

function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Buttons />
      <h1 className="container text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Popular Events <span className="badge text-bg-secondary">Near You</span>
      </h1>
      <Footer />
    </div>
  );
}

export default Home;
