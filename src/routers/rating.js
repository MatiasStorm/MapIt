const router = require("express").Router();

const baseUrl = "/api/ratings";

router.get(`${baseUrl}/:id`, async (req, res) => {
    res.json({ name: "Test" });
});

module.exports = router;
