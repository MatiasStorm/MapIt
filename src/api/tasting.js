const { Tasting } = require("../models");
const { Op } = require("sequelize")
const router = require("express").Router();
const { authenticateToken } = require("../auth");

router.get("", async (req, res) => {
    let queries = [];
    if(req.query?.userId){
        queries.push({userId: req.query.userId});
    }
    const tastings = await Tasting.findAll({
        where: {
            [Op.and]: queries
        }
    });
    res.status(200).json(tastings);
})

router.get("/:id", async (req, res) => {
    res.json({ name: "Test" });
});

router.post("/", authenticateToken, async (req, res) => {
    try {
        req.body.userId = req.user.id;
        const tasting = await Tasting.create(req.body);
        return res.status(201).json(tasting);
    }
    catch (err){
        return res.status(400).json(err.errors)
    }
})



module.exports = router;
