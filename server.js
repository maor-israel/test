const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/get", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  console.log("msg", req.body);

  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

app.post("/get", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  const from = req.body.entry[0].changes[0].value.messages[0].from;
  const text = req.body.entry[0].changes[0].value.messages[0].text.body;
  const msgId = req.body.entry[0].changes[0].value.messages[0].id;

  const token = req.query["hub.verify_token"];

  if (token === VERIFY_TOKEN) {
    console.log({ from, text, msgId });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
