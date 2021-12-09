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

    return router;
};
