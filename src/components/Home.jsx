// eslint-disable-next-line no-unused-vars
import React from "react";
import Header from "./Header";
import Buttons from "./Buttons";
import Footer from "./Footer";

function Home() {
  return (
    <div>
      <Header />
      <Buttons />
      <h1 className="container">
        Popular Events <span className="badge text-bg-secondary">Near You</span>
      </h1>
      <Footer />
    </div>
  );
}

export default Home;
