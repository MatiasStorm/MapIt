const path = require("path");
const express = require("express");

// Initializing aws s3 bucket
require("./s3").config();

// Initialize sequelize:
require("./sequelize")();

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Used to parse http only jwt cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());

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
