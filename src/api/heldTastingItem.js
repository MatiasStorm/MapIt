const router = require("express").Router();
const { HeldTastingItem } = require("../models");

router.get("/", async (req, res) => {
    if (req.query?.heldTastingId) {
        const items = await HeldTastingItem.findAll({
            where: {
                heldTastingId: req.query.heldTastingId,
            },
        });
        return res.status(200).json(items);
    }
    return res.status(200).json([]);
});

module.exports = router;
