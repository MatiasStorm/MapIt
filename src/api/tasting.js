const { Tasting } = require("../models");
const router = require("express").Router();
const { authenticateToken } = require("../auth");

router.get("/:id", async (req, res) => {
    res.json({ name: "Test" });
});

router.post("/", authenticateToken, async (req, res) => {
    try {
        req.body.userId = req.user.id;
        const tasting = await Tasting.create(req.body);
        return res.status(201).json(tasting);
    }
    catch (err){
        return res.status(400).json(err.errors)
    }
})

module.exports = router;
