import Navbar from "./Navbar"; // Import your Navbar if needed
import Footer from "./Footer";

function ForgotPassword() {
  return (
    <>
      <Navbar />
      <main
        id="content"
        role="main"
        className="flex flex-col justify-center items-center w-full max-w-3xl mx-auto p-10 min-h-screen" // Increased max-width and padding
      >
        <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="p-10">
            {" "}
            {/* Increased padding further */}
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-8 text-gray-800">
                {" "}
                {/* Increased heading size */}
                Forgot password?
              </h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                {" "}
                {/* Kept text size larger */}
                Remember your password?{" "}
                <a
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                  href="/login"
                >
                  Login here
                </a>
              </p>
            </div>
            <div className="mt-8">
              {" "}
              {/* Increased margin for spacing */}
              <form>
                <div className="grid gap-y-6">
                  {" "}
                  {/* Increased gap between items */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-lg font-bold ml-1 mb-2 text-gray-900" // Increased label size
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="py-4 px-4 block w-full border-2 border-gray-200 rounded-md text-lg focus:border-blue-500 focus:ring-blue-500 shadow-sm" // Increased input padding and size
                        placeholder="Your email"
                        aria-describedby="email-error"
                      />
                    </div>
                    <p
                      className="hidden text-xs text-red-600 mt-2"
                      id="email-error"
                    >
                      Please include a valid email address so we can get back to
                      you
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="py-4 px-6 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-lg dark:focus:ring-offset-gray-800" // Increased button size
                  >
                    Reset password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ForgotPassword;
