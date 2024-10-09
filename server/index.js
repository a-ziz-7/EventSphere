import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import db from "./db/db.js";

import {
  registerUser,
  loginUser,
  logoutUser,
  isAuthenticated,
} from "./controllers/authController.js";

import {
  getEvents,
  createEvent,
  editEvent,
  getEventsCategory,
  searchEvents,
} from "./controllers/eventController.js";

import { getDevelopers } from "./controllers/developerController.js";

// https://api.predicthq.com/v1/events/?country=US&state=active&private=false&category=academic,community,concerts,festivals,performing-arts,sports&offset=0&limit=2

dotenv.config();

const app = express();
const port = process.env.PORT || 5000; // Default to port 5000 if not set in env

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret", // Ensure a default secret is used if env variable is missing
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Define routes
app.post("/api/auth/register", registerUser);
app.post("/api/auth/login", loginUser);
app.post("/api/auth/logout", isAuthenticated, logoutUser);
app.get("/api/events", getEvents);
app.post("/api/events", isAuthenticated, createEvent);
app.patch("/api/events/:eventId", isAuthenticated, editEvent);
app.get("/api/events/search", searchEvents);
app.get("/api/events/:category", getEventsCategory);
app.get("/api/developers", getDevelopers);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

process.on("SIGINT", () => {
  db.end(() => {
    process.exit(0);
  });
});
