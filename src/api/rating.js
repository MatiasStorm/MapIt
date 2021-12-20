const router = require("express").Router();
const { Rating } = require("../models");
const { authenticate } = require("../auth");

router.get("/:id", async (req, res) => {
    const item = Rating.findByPk(req.params.id);
    if (!item) {
        return res.status(404).send();
    }
    return res.status(200).json(item);
});

router.get("/", async (req, res) => {
    const queries = [];
    if (req.query?.userId) {
        queries.push({ userId: req.query.userId });
    }
    if (req.query?.tastingId) {
        queries.push({ tastingId: req.query.tastingId });
    }
    const tastings = await TastingItem.findAll({
        where: {
            [Op.and]: queries,
        },
    });
    res.status(200).json(tastings);
});

router.post("/", authenticate, async (req, res) => {
    try {
        req.body.userId = req.user.id;
        const rating = await Rating.create(req.body);
        return res.status(201).json(rating);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.errors);
    }
});

router.put("/:id", authenticate, async (req, res) => {

});

router.delete("/:id", authenticate, async (req, res) => {

});

module.exports = router;
