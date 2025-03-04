const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  // For parsing application/json

// Store the data received in the POST request
let webhookData = {};

// Handle incoming POST request from Plivo Webhook
app.post('/plivo-webhook', (req, res) => {
    console.log('===== Incoming Webhook =====');
    console.log('Headers:', req.headers);
    console.log('Parsed Body:', req.body);

    // Store the received data in a variable
    webhookData = req.body;

    // Respond to the POST request
    res.status(200).json({
        message: 'Webhook received successfully',
        data: req.body
    });
});

// Handle GET request to retrieve the stored data
app.get('/plivo-webhook', (req, res) => {
    console.log('===== GET Request for Plivo Webhook Data =====');
    
    // Check if there's data stored
    if (Object.keys(webhookData).length === 0) {
        return res.status(404).json({ message: 'No data available' });
    }

    // Respond with the stored data
    res.status(200).json({
        message: 'Data retrieved successfully',
        data: webhookData
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
