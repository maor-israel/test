const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/webhook", (req, res) => {
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

app.post("/webhook", (req, res) => {

    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
    
    console.log(req.body)
//     console.log("msg", req.body.entry[0].changes[0].value.messages[0].text.body);
//   const from = req.body.entry[0].changes[0].value.messages[0].from;
//   const text = req.body.entry[0].changes[0].value.messages[0].text.body;
//   const msgId = req.body.entry[0].changes[0].value.messages[0].id;

  const token = req.query["hub.verify_token"];

  if (token === VERIFY_TOKEN) {
    console.log({ from, text, msgId });
  }
});

app.get("/send", async (req, res) => {
  const main = async () => {
    const res = await fetch(
      "https://graph.facebook.com/v17.0/107553652069379/messages",
      {
        method: "POST",
        headers: {
          Authorization:
            `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": " application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: "972505551142",
          type: "template",
          template: { name: "hello_world", language: { code: "en_US" } },
        }),
      }
    );

    const json = await res.json();
    return json;
  };

  const result = await main();

  res.send(result);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

