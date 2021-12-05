const router = require("express").Router();

const baseUrl = "/api/tastings";

router.get(`${baseUrl}/:id`, async (req, res) => {
    res.json({ name: "Test" });
});

module.exports = router;
