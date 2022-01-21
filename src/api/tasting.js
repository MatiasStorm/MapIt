const { Op } = require("sequelize");
const router = require("express").Router();
const { authenticate, authorize } = require("../auth");
const { Tasting, Rating, TastingItem } = require("../models");

router.get("", authorize, async (req, res) => {
    const queries = [];
    if (req.user) {
        queries.push({ userId: req.user.id });
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
    const tasting = await Tasting.findByPk(id, {
        include: [
            Rating,
            TastingItem,
        ],
    });
    if (!tasting) {
        return res.status(404).send();
    }
    return res.json(tasting);
});

// api/tastings/
router.post("/", authenticate, async (req, res) => {
    try {
        req.body.userId = req.user.id;
        const tasting = await Tasting.create(req.body);
        return res.status(201).json(tasting);
    } catch (err) {
        return res.status(400).json(err.errors);
    }
});

router.put("/:id", authenticate, async (req, res) => {
    const tasting = await Tasting.findByPk(req.params.id, {
        include: [
            Rating,
            TastingItem,
        ],
    });
    if (!tasting) {
        return res.status(404).send();
    }
    if (tasting.userId !== req.user.id) {
        return res.status(403).send();
    }

    if (req.body.ratings) {
        await tasting.ratings.forEach(async (r) => {
            await r.destroy();
        });
        const ratings = [...req.body.ratings];
        req.body.ratings = [];
        for (const r of ratings) {
            const rating = await Rating.create({
                ...r,
                tastingId: tasting.id,
                userId: tasting.userId,
            });
            req.body.ratings.push(rating);
        }
    }
    if (req.body.tastingItems) {
        await tasting.tastingItems.forEach(async (i) => {
            await i.destroy();
        });
        const items = [...req.body.tastingItems];
        req.body.tastingItems = [];
        for (const i of items) {
            const item = await TastingItem.create({
                ...i,
                tastingId: tasting.id,
                userId: tasting.userId,
            });
            req.body.tastingItems.push(item);
        }
    }
    await tasting.update(req.body);

    return res.status(201).json(tasting);
});

router.delete("/:id", authenticate, async (req, res) => {
    const tasting = await Tasting.findByPk(req.params.id);
    if (!tasting) {
        return res.status(404).send();
    }
    try {
        await tasting.destroy();
        return res.status(204).send();
    } catch (err) {
        return res.status(500).send();
    }
});

module.exports = router;
