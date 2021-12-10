const path = require("path");
const router = require("express").Router();

const pagePath = path.join(__dirname, "../templates/pages");
const componentPath = path.join(__dirname, "../templates/components");

const templater = require("../templater")({ componentPath });

const createPage = (file) => templater.compile(file);

router.get("/", (req, res) => {
    res.send(createPage(`${pagePath}/index.html`));
});

router.use("/user", require("./user")(pagePath, createPage));

module.exports = router;
