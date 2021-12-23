const router = require("express").Router();
const { Player, HeldTasting } = require("../models");


router.post("/", async (req, res) => {
    const pin = req.body.pin;
    const name = req.body.name;
    const heldTasting = await HeldTasting.findOne({
        where: {
            pin
        }
    });
    if(!heldTasting){
        return res.status(400).json({error: "Invalid pin", field: "pin"});
    }

    const player = await Player.create({
        name,
        heldTastingId: heldTasting.id
    });
    return res.redirect(`/tasting/${heldTasting.id}/${pin}`);
})

module.exports = router;
