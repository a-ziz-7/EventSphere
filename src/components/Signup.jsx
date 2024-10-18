import Navbar from "./Navbar";
import Footer from "./Footer";

function Signup() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col justify-center items-center py-8">
        <h1 className="text-4xl font-bold pt-20 mb-8 text-center">
          Registration Form
        </h1>
        {/* Increased width of the form container */}
        <form className="w-full max-w-2xl mx-auto bg-white p-12 rounded-md shadow-md">
          {/* First Name and Last Name in the same row */}
          <div className="flex justify-between mb-6">
            <div className="w-1/2 mr-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="first-name"
              >
                First Name
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="text"
                id="first-name"
                name="firstName"
                placeholder="First Name"
              />
            </div>
            <div className="w-1/2 ml-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="last-name"
              >
                Last Name (Optional)
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="text"
                id="last-name"
                name="lastName"
                placeholder="Last Name"
              />
            </div>
          </div>

          {/* Username */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="username"
              name="username"
              placeholder="Username"
            />
          </div>

          {/* Email and Phone in the same row */}
          <div className="flex justify-between mb-6">
            <div className="w-1/2 mr-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="email"
                id="email"
                name="email"
                placeholder="Email@example.com"
              />
            </div>
            <div className="w-1/2 ml-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone Number (Optional)
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="tel"
                id="phone"
                name="phone"
                placeholder="(123) 456-7890"
              />
            </div>
          </div>

          {/* Password and Confirm Password in the same row */}
          <div className="flex justify-between mb-6">
            <div className="w-1/2 mr-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="password"
                id="password"
                name="password"
                placeholder="********"
              />
            </div>
            <div className="w-1/2 ml-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="password"
                id="confirm-password"
                name="confirmPassword"
                placeholder="********"
              />
            </div>
          </div>

          <button
            className="w-full bg-indigo-500 text-white text-lg font-bold py-2 rounded-md hover:bg-indigo-600 transition duration-300"
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
