const path = require("path");
const express = require("express");

// Initialize sequelize:
require("./sequelize")();

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register all of the api routes:
app.use("/api", require("./api"));

// register all of the routing routes:
app.use(require("./routes"));

app.get("*", (req, res) => {
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Website hosted at http://localhost:${port}`);
});
