const { Tasting } = require("../models");
const router = require("express").Router();

router.get("/:id", async (req, res) => {
    res.json({ name: "Test" });
});

router.post("/", async (req, res) => {
    try {
        const tasting = Tasting.create(req.body);
        console.log(req.body);
        res.status(201).json(tasting);
    }
    catch (err){
        res.statusCode = 400;
        return res.json(err);
    }
})

module.exports = router;
