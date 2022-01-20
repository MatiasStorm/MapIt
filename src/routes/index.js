const path = require("path");
const router = require("express").Router();
const { authorize } = require("../auth");

const pagePath = path.join(__dirname, "../templates/pages");
const componentPath = path.join(__dirname, "../templates/components");

const templater = require("../templater")({ componentPath });

const createPage = (file, variables) => templater.compile(file, variables);

router.get("/", authorize, (req, res) => {
    if (req.session?.player) {
        return res.redirect(req.session.url);
    } if (req.user) {
        return res.redirect("/user/my-tastings");
    }
    return res.send(createPage(`${pagePath}/index.html`));
});

router.get("/login", (req, res) => {
    res.send(createPage(`${pagePath}/login.html`));
});

router.get("/register", (req, res) => {
    res.send(createPage(`${pagePath}/register.html`));
});

router.use("/user", require("./user")(path.join(pagePath, "user"), createPage));

router.use("/tasting", require("./tasting")(path.join(pagePath, "tasting"), createPage));

module.exports = router;
