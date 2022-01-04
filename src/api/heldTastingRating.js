const router = require("express").Router();
const { HeldTastingRating } = require("../models");

router.get("/", async (req, res) => {
    if (req.query.heldTastingId) {
        const ratings = await HeldTastingRating.findAll({
            where: {
                heldTastingId: req.query.heldTastingId,
            },
        });
        const data = {
            ratings,
        };
        return res.json(data);
    }
    return res.json({});
});

module.exports = router;
