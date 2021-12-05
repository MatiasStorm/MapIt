const express = require("express");
const sequelize = require("./sequelize.js");

const app = express();
const port = 8080;

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register all of the routers:
const routers = require("./routers");

Object.values(routers).forEach((router) => {
    app.use(router);
});

app.get("/", (req, res) => {
    res.send("Working!");
});

app.listen(port, () => {
    console.log(`Website hosted at http://localhost:${port}`);
});
