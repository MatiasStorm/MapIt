const router = require("express").Router();
const { Op } = require("sequelize");
const { signToken } = require("../auth");
const { User } = require("../models");

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user !== null) {
            return res.json(user);
        }
        return res.status(404).send();
    } catch (err) {
        return res.status(500).json(err);
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
        const accessToken = signToken(user);
        res.cookie("auth", accessToken, {
            httpOnly: true,
        });
        res.redirect(301, "/user/my-tastings");
        return res.send();
    }
    return res.status(401).send();
});

router.post("/logout", async (req, res) => {
    res.cookie("auth", "", {
        httpOnly: true,
        maxAge: 0,
    }).send();
});

module.exports = router;
