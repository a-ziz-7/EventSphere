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
    getDevelopers
} from './controllers/developerController.js';

// https://api.predicthq.com/v1/events/?country=US&state=active&private=false&category=academic,community,concerts,festivals,performing-arts,sports


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
// Test route
app.get('/api/developers', getDevelopers);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

process.on('SIGINT', () => {
    db.end(() => {
        console.log('Database pool has ended');
        process.exit(0);
    });
});
