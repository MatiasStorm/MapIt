const router = require("express").Router();

const baseUrl = "/api/players";

router.get(`${baseUrl}/:id`, async (req, res) => {
    res.json({ name: "Test" });
});

module.exports = router;
