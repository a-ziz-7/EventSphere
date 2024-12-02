// Layout.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="bg-white min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Design */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 aspect-[1155/678] w-[72.1875rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
