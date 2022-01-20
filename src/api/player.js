const router = require("express").Router();
const { Op } = require("sequelize");
const { Player, HeldTasting } = require("../models");

router.post("/", async (req, res) => {
    const { pin } = req.body;
    const { name } = req.body;
    const heldTasting = await HeldTasting.findOne({
        where: {
            pin,
        },
    });
    if (!heldTasting) {
        return res.status(400).json({ error: "Invalid pin", field: "pin" });
    }

    const player = await Player.create({
        name,
        heldTastingId: heldTasting.id,
    });
    req.session.player = player;
    const url = `/tasting/${heldTasting.id}/${pin}`;
    req.session.url = url;
    return res.redirect(url);
});

router.get("/", async (req, res) => {
    const queries = [];
    if (req.query?.whoAmI) {
        if (!req.session?.player) {
            return res.redirect("/");
        }
        return res.status(200).json(req.session?.player);
    }
    if (req.query?.heldTastingId) {
        queries.push({ heldTastingId: req.query.heldTastingId });
    }
    const players = await Player.findAll({
        where: {
            [Op.and]: queries,
        },
    });
    res.status(200).json(players);
});

router.post("/logout", async (req, res) => {
    req.session.destroy();
    res.status(201).send();
});

module.exports = router;
