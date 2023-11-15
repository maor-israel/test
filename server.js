const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 1000;

app.use(express.json());

app.get('/get', (req, res) => {
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
    var textMessage = req.body.entry[0].changes[0].value.messages[0];
    console.log("msg", JSON.stringify(textMessage));

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});


app.listen(port, () => console.log(sstarted))