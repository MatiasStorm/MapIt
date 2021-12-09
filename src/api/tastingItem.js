const router = require("express").Router();

router.get("/:id", async (req, res) => {
    res.json({ name: "Test" });
});

module.exports = router;
