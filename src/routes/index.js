const path = require("path");
const router = require("express").Router();

const pagePath = path.join(__dirname, "../pages");

router.get("/", (req, res) => {
    res.sendFile(pagePath + "/index.html");
})

router.use("/user", require("./user")(pagePath));


module.exports = router;


