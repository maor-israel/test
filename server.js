const express = require("express");
const app = express();


app.post("/", (req, res) => {

    const body = req.body;
    console.log(body)
    res.send(
        "banana"
    )
});





app.listen(1000, () => console.log("started"))