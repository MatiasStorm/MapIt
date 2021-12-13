const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User } = require("../models");

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user !== null) {
            return res.json(user);
        }
        res.statusCode = 404;
        res.send();
    } catch (err) {
        res.statusCode = 500;
        res.json(err);
    }
});

router.post("", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.statusCode = 201;
        res.json(user);
    } catch (err) {
        res.statusCode = 400;
        res.json(err.errors);
    }
});

router.post("/login", async (req, res) => {
    const { body } = req;
    if (body.username == null
        || body.password == null
        || body.username.length === 0
        || body.password.length === 0
    ) {
        res.status(400);
        return res.send();
    }
    const user = await User.findOne({
        where: {
            [Op.and]: [
                { username: body.username },
                { password: body.password },
            ],
        },
    });
    if (user) {
        const data = {
            username: user.username,
            id: user.id,
        };
        const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
        res.cookie("auth", `Baerer ${accessToken}`, {
            httpOnly: true,
        });
        res.redirect(301, "/user/dashboard");
        return res.send();
    }
    res.status(401);
    res.send();
});

router.post("/logout", async (req, res) => {

});

module.exports = router;
