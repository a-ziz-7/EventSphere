import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
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
  attendEvent
} from "./controllers/eventController.js";

import { getDevelopers } from "./controllers/developerController.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Default to port 5000 if not set in env

// app.use(cors());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));


app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
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
// Test route
app.get("/api/developers", getDevelopers);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

process.on("SIGINT", () => {
  db.end(() => {
    process.exit(0);
  });
});
