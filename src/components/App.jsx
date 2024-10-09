// App.jsx
import Home from "./Home";
import FrontPage from "./FrontPage";
import Layout from "./Layout"; // Import the Layout component
import OurTeam from "./OurTeam";
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
        {/* Wrap your routes in the Layout component */}
        <Routes>
          {/* Route for Home */}
          <Route path="/" element={<FrontPage />} />
          <Route path="/home" element={<Home />} />
          {/* Route for Our Team */}
          <Route path="/team" element={<OurTeam />} />
          {/* Redirect to Home if route is not found */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
