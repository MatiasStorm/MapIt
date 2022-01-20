const router = require("express").Router();
const { Op } = require("sequelize");
const { HeldTastingRating, PlayerRating } = require("../models");

router.get("/", async (req, res) => {
    const queries = [];
    if (req.query.heldTastingId) {
        queries.push({ heldTastingId: req.query.heldTastingId });
    }
    const ratings = await HeldTastingRating.findAll({
        where: {
            [Op.and]: queries,
        },
        include: {
            model: PlayerRating,
            where: req.query.heldTastingItemId ? {
                heldTastingItemId: req.query.heldTastingItemId,
            } : {},
            required: false,
        },
    });
    return res.json(ratings);
});

module.exports = router;
