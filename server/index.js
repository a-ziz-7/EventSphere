import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import db from './db/db.js';

import {
    registerUser,
    loginUser,
    logoutUser,
    isAuthenticated
} from './controllers/authController.js';

import {
    getEvents,
    createEvent,
    editEvent,
    getEventsCategory,
    searchEvents,
    getUserLocation
} from './controllers/eventController.js';

import {
    getDevelopers
} from './controllers/developerController.js';

// https://api.predicthq.com/v1/events/?country=US&state=active&private=false&category=academic,community,concerts,festivals,performing-arts,sports&offset=0&limit=2


dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Session middleware setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Define routes
// User authentication routes
app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', loginUser);
app.post('/api/auth/logout', isAuthenticated, logoutUser);
// Event routes
app.get('/api/events', getEvents);
app.post('/api/events', isAuthenticated, createEvent);
app.patch('/api/events/:eventId', isAuthenticated, editEvent);
app.get('/api/events/search', searchEvents);
app.get('/api/events/:category', getEventsCategory);
// Test route
app.get('/api/developers', getDevelopers);


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send(getUserLocation(req));
});

process.on('SIGINT', () => {
    db.end(() => {
        process.exit(0);
    });
});
