const express = require("express");
const dotenv = require("dotenv");
const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.PORT || 3000;

app.get("/webhook", async (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  const token = req.query["hub.verify_token"];
  const mode = req.query["hub.mode"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK_VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post("/webhook", async (req, res) => {
    try {
      const body = req.body;
      const from = body.entry[0].changes[0].value.messages[0].from;
      const text = body.entry[0].changes[0].value.messages[0].text.body;
      const type = body.entry[0].changes[0].value.messages[0].type;

      console.log({ from, text, type });

      res.status(200).send("Message processed");
    } catch (error) {
      console.error("Error processing message:", error);
      res.status(500).send("Internal Server Error");
    }
});

app.get("/send", async (req, res) => {
  const main = async () => {
    const res = await fetch(
      "https://graph.facebook.com/v17.0/107553652069379/messages",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
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
