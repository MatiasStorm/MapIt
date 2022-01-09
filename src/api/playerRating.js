const router = require("express").Router();
const { PlayerRating } = require("../models");

router.post("/", async (req, res) => {
    if (!req.session?.player) {
        return res.status(401).send();
    }
    const ratings = req.body.map(r => { 
        r.playerId = req.session.player.id 
        return r;
    });
    try {
        await PlayerRating.bulkCreate(ratings);
        return res.status(204).send();
    }
    catch (err){
        console.log(err);
        return res.status(400).json(err);
    }
})


module.exports = router;
