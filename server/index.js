import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import db from "./db/db.js";

import {
  registerUser,
  loginUser,
  logoutUser,
  isAuthenticated,
} from "./controllers/authController.js";


import {
  eventInfo,
  getEvents,
  createEvent,
  editEvent,
  getEventsCategory,
  searchEvents,
  getEventsRadius,
  attendEvent,
  cancelAttendEvent
} from "./controllers/eventController.js";

import { getDevelopers } from "./controllers/developerController.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// app.use(cors());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Allow requests from your frontend
    credentials: true, // Allow cookies and credentials
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret", // Ensure a default secret is used if env variable is missing
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// User authentication routes
app.post("/api/auth/register", registerUser);
app.post("/api/auth/login", loginUser);
app.post("/api/auth/logout", isAuthenticated, logoutUser);
// Event routes
app.get('/api/events/id/:eventId', eventInfo);
app.get('/api/events/all', getEvents);
app.get('/api/events', getEventsRadius);
// app.post('/api/events', isAuthenticated, createEvent);
app.post('/api/events', createEvent);
app.patch('/api/events/id/:eventId', isAuthenticated, editEvent);
app.get('/api/events/search', searchEvents);
app.get('/api/events/category/:category', getEventsCategory);
app.post('/api/events/attend', attendEvent);
app.post('/api/events/cancel', cancelAttendEvent);
// Test route
app.get("/api/developers", getDevelopers);

app.listen(port, () => {
  // console.log(`Server running on http://localhost:${port}`);
});

process.on("SIGINT", () => {
  db.end(() => {
    process.exit(0);
  });
});

