module.exports = (pagePath) => {
    const router = require("express").Router();

    router.get("/login", (req, res) => {
        res.sendFile(pagePath + "/user/login.html");
    })

    router.get("/register", (req, res) => {
        res.sendFile(pagePath + "/user/register.html");
    })

    return router;
}

