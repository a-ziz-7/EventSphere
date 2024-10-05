import db from '../db/db.js';

// Endpoint to retrieve all rows from the developer table
export const getDevelopers = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM developer');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching developers:', err.stack);
        res.status(500).send('Server error');
    }
};
