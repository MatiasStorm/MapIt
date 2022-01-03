const router = require("express").Router();
const { HeldTastingRating } = require("../models");

router.get("/", async (req, res) => {
    if(req.query.heldTastingId){
        const ratings = await HeldTastingRating.findAll({
            where: {
                heldTastingId: req.query.heldTastingId
            }
        });
        return res.json(ratings);
    }
    return res.json([]);
});

module.exports = router;
