const express = require('express');

const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.send("Working!");
})

app.listen(port, () => {
    console.log(`Website hosted at http://localhost:${port}`);
})
