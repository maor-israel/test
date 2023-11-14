const express = require("express");
const app = express();


app.post("/", (req,res) => {

    const body = JSON.parse(req.body);
    console.log(body)
    res.send(200)
});



app.listen(process.env.port)