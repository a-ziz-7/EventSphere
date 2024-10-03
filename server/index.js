import dotenv from 'dotenv';
import pg from 'pg';
import cors from 'cors';
import express from 'express';

dotenv.config();

// PostgreSQL connection using Supabase credentials
const db = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Connect to the database
db.connect();

// Create an Express app
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint to retrieve all rows from the developer table
app.get('/api/developers', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM developer');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching developers:', err.stack);
        res.status(500).send('Server error');
    }
});

app.get('/api/events/:category', async (req, res) => {
    const { category } = req.params;

    try {
        // Query to fetch events where categories contain the specified category
        const query = `
            SELECT * FROM event 
            WHERE categories LIKE $1
        `;
        const result = await db.query(query, [`%${category}%`]);
        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.status(404).send('No events found for this category.');
        }
    } catch (err) {
        console.error('Error fetching events:', err.stack);
        res.status(500).send('Server error');
    }
});


// Optional: Keep the server running
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
