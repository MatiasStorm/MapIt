const { Tasting } = require("../models");
const router = require("express").Router();

router.get("/:id", async (req, res) => {
    res.json({ name: "Test" });
});

router.post("/", async (req, res) => {
    try {
        const tasting = await Tasting.create(req.body);
        return res.status(201).json(tasting);
    }
    catch (err){
        return res.status(400).json(err.errors)
    }
})

module.exports = router;
