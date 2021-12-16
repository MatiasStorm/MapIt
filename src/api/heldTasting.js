const router = require("express").Router();
const { authenticateToken } = require("../auth");
const { 
    Tasting, 
    HeldTasting, 
    HeldTastingRating, 
    HeldTastingItem,
    Rating,
    TastingItem,
} = require("../models");

function generatePin(){
    const values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const length = 8;
    let pin = "";
    for(i = 0; i < length; i++){
        pin += values[ Math.floor(Math.random() * ( values.length - 1 )) ]
    }
    return pin;
}

router.post("/", authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const tastingId = req.body.tastingId;

    const tasting = await Tasting.findOne({
        where: {
            id: tastingId
        },
        include: [
            TastingItem,
            Rating
        ]
    });

    const pin = generatePin();

    const heldTasting = await HeldTasting.create({
        title: tasting.title,
        userId,
        pin,
        imagePath: tasting.imagePath
    });

    for(let item of tasting.tastingItems){
        await HeldTastingItem.create({
            title: item.title,
            imagePath: item.imagePath,
            userId,
            description: item.description,
            heldTastingId: heldTasting.id
        });
    }

    for(let rating of tasting.ratings){
        await HeldTastingRating.create({
            title: rating.title,
            position: rating.position,
            heldTastingId: heldTasting.id,
            userId,
        });
    }

    return res.status(201).json(await HeldTasting.findByPk(heldTasting.id, {
        include: [
            HeldTastingItem,
            HeldTastingRating
        ]
    }));
});

module.exports = router;
