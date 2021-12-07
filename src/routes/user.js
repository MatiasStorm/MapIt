module.exports = (pagePath, createPage) => {
    const router = require("express").Router();

    const loginPage = createPage(pagePath + "/user/login.html"); 
    const registerPage = createPage(pagePath + "/user/register.html");

    router.get("/login", (req, res) => {
        res.send(loginPage);
    })

    router.get("/register", (req, res) => {
        res.send(registerPage);
    })

    return router;
}

