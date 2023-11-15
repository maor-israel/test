const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse the incoming requests with JSON payloads
app.use(express.json());

// Endpoint for the webhook
app.get('/', (req, res) => {
    console.log("req",req);
    // Your verify token. Should be a secret kept in the environment variables
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode are in the query string of the request
    if (mode && token) {
        // Checks the mode and token sent are correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);      
        }
    }
});

app.post('/', (req, res) => {
    console.log("req",req);
    // Your verify token. Should be a secret kept in the environment variables
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode are in the query string of the request
    if (mode && token) {
        // Checks the mode and token sent are correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);      
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
