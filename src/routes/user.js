const router = require("express").Router();

module.exports = (pagePath, createPage) => {
    router.get("/login", (req, res) => {
        const options = {
            title: "Login",
        };
        const page = createPage(`${pagePath}/user/login.html`, options);
        res.send(page);
    });

    router.get("/register", (req, res) => {
        const options = {
            title: "Register",
        };
        const page = createPage(`${pagePath}/user/register.html`, options);
        res.send(page);
    });

    router.get("/dashboard", (req, res) => {
        const options = {
            title: "Dashboard",
        };
        const page = createPage(`${pagePath}/user/dashboard.html`, options);
        res.send(page);
    });

    router.get("/account", (req, res) => {
        const options = {
            title: "Account",
        };
        const page = createPage(`${pagePath}/user/account.html`, options);
        res.send(page);
    });

    router.get("/explore", (req, res) => {
        const options = {
            title: "Explore",
        };
        const page = createPage(`${pagePath}/user/explore.html`, options);
        res.send(page);
    });

    router.get("/held-tastings", (req, res) => {
        const page = createPage(`${pagePath}/user/held-tastings.html`);
        res.send(page);
    });

    router.get("/my-tastings", (req, res) => {
        const page = createPage(`${pagePath}/user/my-tastings.html`);
        res.send(page);
    });
    return router;
};
