// index.js
// Where your node app starts

// Initialize project
var express = require('express');
var app = express();

// Enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// So that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // Some legacy browsers choke on 204

// Serve static files from the "public" directory
app.use(express.static('public'));

// Basic routing
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// First API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
