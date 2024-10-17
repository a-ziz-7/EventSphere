import Navbar from "./Navbar";
import Footer from "./Footer";

function Signup() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col justify-center items-center py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Registration Form
        </h1>
        <form className="w-full max-w-lg mx-auto bg-white p-12 rounded-md shadow-md">
          {/* First Name */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="first-name"
            >
              First Name
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="first-name"
              name="firstName"
              placeholder="First Name"
            />
          </div>

          {/* Last Name */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="last-name"
            >
              Last Name
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="last-name"
              name="lastName"
              placeholder="Last Name"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="email"
              id="email"
              name="email"
              placeholder="Email@example.com"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="tel"
              id="phone"
              name="phone"
              placeholder="(123) 456-7890"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              id="password"
              name="password"
              placeholder="********"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              id="confirm-password"
              name="confirmPassword"
              placeholder="********"
            />
          </div>

          <button
            className="w-full bg-indigo-500 text-white text-lg font-bold py-3 rounded-md hover:bg-indigo-600 transition duration-300"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
