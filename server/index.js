import express, { json } from 'express';
import cors from 'cors';
const app = express();
const port = 5000;

// Use CORS middleware to allow requests from any origin
app.use(cors());

// Middleware to parse JSON requests
app.use(json());

// Sample events with categories
const events = [
    {
        id: 1,
        title: "Broadway Show",
        time: "2024-10-05T14:00:00Z",
        owner: "John Doe",
        limit: 200,
        description: "A classic Broadway show in New York City.",
        address: "Times Square, NY",
        attendees: 150,
        pictures: ["image1.jpg", "image2.jpg"],
        chat: ["Looking forward to it!", "Great event!"],
        categories: ["shows", "theater"]
    },
    {
        id: 2,
        title: "Yoga Class",
        time: "2024-10-10T08:00:00Z",
        owner: "Jane Smith",
        limit: 50,
        description: "Morning Yoga session in the park.",
        address: "Central Park, NY",
        attendees: 30,
        pictures: ["yoga1.jpg", "yoga2.jpg"],
        chat: ["Excited!", "Can't wait for the session!"],
        categories: ["fitness"]
    },
    {
        id: 3,
        title: "Tech Meetup",
        time: "2024-10-12T18:00:00Z",
        owner: "Aziz Abdusamiev",
        limit: 100,
        description: "A social gathering for tech enthusiasts to network and share ideas.",
        address: "Brooklyn, NY",
        attendees: 70,
        pictures: ["meetup1.jpg", "meetup2.jpg"],
        chat: ["This looks interesting!", "Can't wait to meet new people."],
        categories: ["social", "tech"]
    },
    {
        id: 4,
        title: "Football Match",
        time: "2024-10-20T16:00:00Z",
        owner: "Sports Club",
        limit: 1000,
        description: "Local football match at the stadium.",
        address: "Brooklyn Stadium, NY",
        attendees: 800,
        pictures: ["football1.jpg", "football2.jpg"],
        chat: ["Can't wait for the match!", "Go team!"],
        categories: ["sports"]
    },
    {
        id: 5,
        title: "Concert in the Park",
        time: "2024-10-20T16:00:00Z",
        owner: "Mike Johnson",
        limit: 1000,
        description: "Live music concert in the park.",
        address: "Brooklyn Stadium, NY",
        attendees: 800,
        pictures: [],
        chat: ["Can't wait for the match!", "Go team!"],
        categories: ["concert", "art", "food-drinks", "social"]
    }
];

// Route to get events by category
app.get('/api/events/:category', (req, res) => {
    const { category } = req.params;
    const filteredEvents = events.filter(event => event.categories.includes(category));

    if (filteredEvents.length > 0) {
        res.json(filteredEvents);
    } else {
        res.status(404).send('No events found for this category.');
    }
});

//Route to get events by title
app.get('/api/events/:title', (req,res) => {
    const{ title } = req.params;
    const filteredEvents = events.filter(event => event.title.includes(title));

    if(filteredEvents.length > 0){
        res.json(filteredEvents);
    } else{
        res.status(404).send('No events found by this title.')
    }
});

//Route to get events by owner
app.get('/api/events/:owner', (req,res) =>{
    const{ owner } = req.params;
    const events = events.filter(event => event.owner.includes(owner) );
    if(filteredEvents.length > 0){
        res.json(filteredEvents);
    }
    else{
        res.status(404).send('No events found for this owner.')
    }
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
