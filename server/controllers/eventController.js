import db from '../db/db.js';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const validCategories = ["academic", "community", "concerts", "festivals", "performing-arts", "sports", "public-holidays", "school-holidays"];

export const createEvent = async (req, res) => {
    try {
        // Ensure user is authenticated before proceeding
        const user = req.session.user;

        if (!user) {
            return res.status(401).send('Unauthorized');
        }

        // Extract event details from the request body
        const { title, description, time, address, capacity, categories, duration, state, thumbnail = null } = req.body;

        // Generate a new UUID for the event
        const eventId = uuidv4();

        // Insert the event into the database
        await db.query(
            `INSERT INTO event (id, title, description, created_at, time, address, capacity, user_id, categories, duration, state, thumbnail)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
            [
                eventId,
                title,
                description,
                new Date(), // created_at set to current time
                time,
                address,
                capacity,
                user.id, // Set the user_id from the session data
                categories.join(','), // Convert categories array to comma-separated string
                duration,
                state,
                thumbnail
            ]
        );

        console.log(`Event "${title}" created successfully by user ID: ${user.id}`);
        res.status(201).send(`Event "${title}" created successfully.`);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).send('Error creating event.');
    }
};

export const getEvents = async (req, res) => {
    const { state } = req.query; // Extract the 'state' query parameter
    try {
        let query = 'SELECT * FROM event';
        const params = [];

        if (state) {
            query += ' WHERE state = $1'; // Use parameterized query to prevent SQL injection
            params.push(state);
        }

        const result = await db.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching events:', err.stack);
        res.status(500).send('Server error');
    }
};

export const editEvent = async (req, res) => {
    const { eventId } = req.params; // Get the event ID from the URL
    const {
        title,
        description,
        time,
        address,
        capacity,
        categories,
        duration,
        state,
        thumbnail
    } = req.body; // Extract fields from the request body

    try {
        // Get the current event from the database
        const existingEvent = await db.query('SELECT * FROM event WHERE id = $1', [eventId]);

        if (existingEvent.rows.length === 0) {
            return res.status(404).send('Event not found.');
        }

        // Prepare the update query and parameters (only update fields that are provided)
        const updateFields = [];
        const updateValues = [];

        if (title) {
            updateFields.push('title = $' + (updateFields.length + 1));
            updateValues.push(title);
        }
        if (description) {
            updateFields.push('description = $' + (updateFields.length + 1));
            updateValues.push(description);
        }
        if (time) {
            updateFields.push('time = $' + (updateFields.length + 1));
            updateValues.push(time);
        }
        if (address) {
            updateFields.push('address = $' + (updateFields.length + 1));
            updateValues.push(address);
        }
        if (capacity) {
            updateFields.push('capacity = $' + (updateFields.length + 1));
            updateValues.push(capacity);
        }
        if (categories) {
            updateFields.push('categories = $' + (updateFields.length + 1));
            updateValues.push(categories.join(',')); // Store categories as a comma-separated string
        }
        if (duration) {
            updateFields.push('duration = $' + (updateFields.length + 1));
            updateValues.push(duration);
        }
        if (state) {
            updateFields.push('state = $' + (updateFields.length + 1));
            updateValues.push(state);
        }
        if (thumbnail !== undefined) {
            updateFields.push('thumbnail = $' + (updateFields.length + 1));
            updateValues.push(thumbnail);
        }

        // Add eventId as the last parameter to update the correct event
        updateValues.push(eventId);

        // Only proceed if there are fields to update
        if (updateFields.length > 0) {
            const updateQuery = `
                UPDATE event
                SET ${updateFields.join(', ')}
                WHERE id = $${updateValues.length}
                RETURNING *;
            `;

            // Execute the update query
            const result = await db.query(updateQuery, updateValues);
            res.json(result.rows[0]);
        } else {
            res.status(400).send('No fields provided to update.');
        }
    } catch (err) {
        console.error('Error updating event:', err.stack);
        res.status(500).send('Server error.');
    }
};

export const searchEvents = async (req, res) => {
    const { title, address, start, end, category, state } = req.body; // optional fields

    try {
        // Base query
        let query = 'SELECT * FROM event WHERE 1=1';
        const values = [];
        let index = 1;

        // Add conditions dynamically based on provided fields
        if (title) {
            query += ` AND title ILIKE $${index}`;
            values.push(`%${title}%`); // Use ILIKE for case-insensitive search
            index++;
        }

        if (address) {
            query += ` AND address ILIKE $${index}`;
            values.push(`%${address}%`);
            index++;
        }

        if (start) {
            query += ` AND time >= $${index}`;
            values.push(start);
            index++;
        }

        if (end) {
            query += ` AND time <= $${index}`;
            values.push(end);
            index++;
        }

        if (category) {
            query += ` AND categories ILIKE $${index}`;
            values.push(`%${category}%`);
            index++;
        }

        if (state) {
            query += ` AND state ILIKE $${index}`;
            values.push(`%${state}%`);
            index++;
        }

        // Execute the query
        const result = await db.query(query, values);

        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.status(404).send('No events found for the provided search criteria.');
        }

    } catch (err) {
        console.error('Error searching events:', err.stack);
        res.status(500).send('Server error');
    }
};

export const getEventsCategory = async (req, res) => {
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
};

async function getEventsPredictHQ(start = 0, stop = 2500) {
    const url = 'https://api.predicthq.com/v1/events/';
    const limit = 50; // number of events you want to fetch per request
    let offset = start; // number of events to skip
    let events = [];

    try {
        while (offset < stop) {
            const params = {
                country: 'US',
                state: 'active',
                private: 'false',
                category: validCategories.join(','),
                offset: offset.toString(), // Convert to string
                limit: limit.toString() // Convert to string
            };
            const headers = {
                Authorization: 'Bearer ' + process.env.PREDICTHQ_API_KEY
            };

            // Make the API request
            const response = await axios.get(url, { params, headers });

            // Debugging: log the response status and data
            // console.log(`Response Status: ${response.status}`);
            // console.log(`Response Data: `, response.data);

            // Process each event in the response
            if (response.data.results && response.data.results.length > 0) {
                for (const event of response.data.results) {
                    let eventObj = {
                        title: event.title,
                        description: event.description.substring("Sourced from predicthq.com".length).trim(),
                        labels: event.labels,
                        start: event.start,
                        duration: event.duration === 0 ?
                            isNaN(Math.floor((new Date(event.predicted_end) - new Date(event.start)) / 60000)) ? 0 :
                                Math.floor((new Date(event.predicted_end) - new Date(event.start)) / 60000) :
                            event.duration,
                        location: event.location,
                        address: event.geo.address.formatted_address,
                        state: event.geo.address.region,
                        limit: parseInt(Math.ceil(event.phq_attendance / 100) * 100)
                    };
                    events.push(eventObj);
                }
            } else {
                console.log('No more events to fetch.');
                break; // Break if there are no results
            }

            if (response.data.results.length < limit) {
                break; // Break if fewer results than requested
            }

            offset += limit;
        }

        // for (const event of events) {
        //     console.log(event);
        // }
        console.log(`Total Events Fetched: ${events.length}`);
        return events;
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

async function seedEvents(events) {
    try {
        for (const event of events) {
            const { title, address, start } = event;

            // Check for duplicates in the database
            const duplicateCheck = await db.query(
                'SELECT * FROM event WHERE title = $1 AND address = $2 AND time = $3',
                [title, address, start]
            );

            // If no duplicate, insert the new event
            if (duplicateCheck.rows.length === 0) {
                const eventData = {
                    id: uuidv4(), // Generate a new UUID for the event
                    title: event.title,
                    // description: event.description.substring("Sourced from predicthq.com - ".length),
                    description: event.description.trim(),
                    labels: event.labels,
                    time: event.start, // Assuming 'time' refers to 'start'
                    created_at: new Date(), // Set the created_at to the current date/time
                    address: event.address,
                    capacity: event.limit, // Updated to use capacity
                    user_id: "c328586b-ed35-4ec8-998b-13a464653a57",
                    categories: event.labels.map(label => label.trim()).join(','), // Trim labels before joining
                    attendies: [], // Initialized as empty
                    pictures: [], // Initialized as empty
                    duration: event.duration,
                    state: event.state,
                    thumbnail: null, // Empty if there is no URL
                };

                await db.query(
                    `INSERT INTO event (id, title, description, created_at, time, address, capacity, user_id, categories, attendies, pictures, duration, state, thumbnail)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
                    [
                        eventData.id,
                        eventData.title,
                        eventData.description,
                        eventData.created_at,
                        eventData.time,
                        eventData.address,
                        eventData.capacity, // Updated to use capacity
                        eventData.user_id,
                        eventData.categories,
                        eventData.attendies,
                        eventData.pictures,
                        eventData.duration,
                        eventData.state,
                        eventData.thumbnail,
                    ]
                );
                // console.log(`Inserted event: ${event.title}`);
            } else {
                // console.log(`Duplicate event found: ${event.title}`);

            }
        }
    } catch (error) {
        console.error('Error seeding events:', error);
    }
}

async function startSeeding() {
    console.log('Seeding events............................................');
    const events1 = await getEventsPredictHQ(0, 2500);
    await seedEvents(events1); // Run initially 1
    const events2 = await getEventsPredictHQ(2500, 5000);
    await seedEvents(events2); // Run initially 2

    // Set an interval to run seedEvents every 10 minutes (600,000 milliseconds)
    setInterval(async () => {
        await seedEvents();
    }, 43200000); // 12 hours
}

export const getUserLocation = () => {
    console.log('Getting user location...');
};


// do not need to do it until production
// startSeeding();

async function getStatistics() {
    const result = await db.query('SELECT categories FROM event');
    const rows = result.rows;
    let stats = {};
    for (const row of rows) {
        const categories = row.categories.split(',');
        for (let category of categories) {
            category = category.trim();
            if (stats[category]) {
                stats[category]++;
            } else {
                stats[category] = 1;
            }
        }
    }
    return stats;
}
