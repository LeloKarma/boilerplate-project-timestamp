const express = require('express');
const app = express();

// Serve static files from the public directory
app.use(express.static('public'));

// Timestamp endpoint
app.get('/api/timestamp/:date_string?', (req, res) => {
    let dateString = req.params.date_string;
    let date;

    // If no date_string is provided, use the current date
    if (!dateString) {
        date = new Date();
    } else {
        // Check if dateString is a Unix timestamp
        if (!isNaN(dateString)) {
            dateString = parseInt(dateString);
        }
        date = new Date(dateString);
    }

    // Check if the date is valid
    if (date.toString() === "Invalid Date") {
        res.json({ error: "Invalid Date" });
    } else {
        res.json({ unix: date.getTime(), utc: date.toUTCString() });
    }
});

// Root endpoint
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
