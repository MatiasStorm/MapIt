const router = require("express").Router();
const { User } = require("../models");

const baseUrl = "/api/users";

router.get(`${baseUrl}/:id`, async (req, res) => {
    res.json({ name: "Test" });
});

router.post(`${baseUrl}`, async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.statusCode = 201;
        res.json(user);
    } catch (err) {
        res.statusCode = 400;
        res.json(err.errors);
    }
});

module.exports = router;
