// App.jsx
import Home from "./Home";
import FrontPage from "./FrontPage";
import Layout from "./Layout"; // Import the Layout component
import OurTeam from "./OurTeam";
import EventsBrowser from "./EventsBrowser";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import Create from "./Create";
import RSVP from "./RSVP";
import EventDetails from "./EventDetails";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./Navbar";
import { UserProvider } from "./UserContext";
import Terms from "./Terms";

function App() {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Navbar />
          {/*This <Layout> is to have the background color wrap the whole body */}{" "}
          {/* Wrap your routes in the Layout component */}
          <Routes>
            {/* Route for Home */}
            <Route path="/" element={<FrontPage />} />
            <Route path="/home" element={<Home />} />
            {/* Route for Our Team */}
            <Route path="/team" element={<OurTeam />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/browse" element={<EventsBrowser />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/create" element={<Create />} />
            <Route path="/rsvp" element={<RSVP />} />
            <Route path="event/:eventId" element={<EventDetails />} />
            {/* Redirect to Home if route is not found */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  );
}

export default App;
