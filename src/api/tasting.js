const { Tasting } = require("../models");
const { Op } = require("sequelize");
const router = require("express").Router();
const { authenticate } = require("../auth");

router.get("", async (req, res) => {
    const queries = [];
    if (req.query?.userId) {
        queries.push({ userId: req.query.userId });
    }
    const tastings = await Tasting.findAll({
        where: {
            [Op.and]: queries,
        },
    });
    res.status(200).json(tastings);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const tasting = await Tasting.findByPk(id);
    if (!tasting) {
        return res.status(404).send();
    }
    return res.json(tasting);
});

router.post("/", authenticate, async (req, res) => {
    try {
        req.body.userId = req.user.id;
        const tasting = await Tasting.create(req.body);
        return res.status(201).json(tasting);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.errors);
    }
});

router.put("/:id", authenticate, async (req, res) => {
    const tasting = await Tasting.findByPk(req.params.id);
    if (!tasting) {
        return res.status(404).send();
    }
    if (tasting.userId !== req.user.id) {
        return res.status(403).send();
    }

    await tasting.update(req.body);

    return res.status(201).json(tasting);
});

module.exports = router;
