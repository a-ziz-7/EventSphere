// Layout.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="bg-white min-h-screen flex flex-col relative overflow-hidden">
      {/* Gradient Background Layer */}
      <div className="gradient-background" aria-hidden="true" />

      {/* Main Content Layer */}
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default Layout;
