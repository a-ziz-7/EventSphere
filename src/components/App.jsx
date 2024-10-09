// App.jsx
import Home from "./Home";
import FrontPage from "./FrontPage";
import Layout from "./Layout"; // Import the Layout component
import OurTeam from "./OurTeam";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Layout>
        {" "}
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
          {/* Redirect to Home if route is not found */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
